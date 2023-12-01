import React from 'react'
import * as d3 from 'd3'
import { useTheme } from '@mui/material'

const TICK_MARKER_SIZE = 6
const POINT_RADIUS = 2

export type DataPoint = { x: number; y: number }

/**
 * Computes the linear scales for the x and y dimension for the given data and chart sizes
 */
function getScales(data: DataPoint[], chartWidth: number, chartHeight: number) {
  const { rangeX, rangeY } = computeDataRange(data)

  return {
    xScale: d3.scaleLinear().domain(rangeX).range([0, chartWidth]).nice(),
    yScale: d3.scaleLinear().domain(rangeY).range([chartHeight, 0]).nice(),
  }
}

/**
 * Returns the data ranges (min/max) for the x and y dimension
 */
function computeDataRange(data: DataPoint[]): { rangeX: number[]; rangeY: number[] } {
  if (data.length === 0) {
    throw new Error('Input data array is empty')
  }
  let minX = data[0].x
  let maxX = data[0].x
  let minY = data[0].y
  let maxY = data[0].y

  for (const point of data) {
    if (point.x < minX) {
      minX = point.x
    }
    if (point.x > maxX) {
      maxX = point.x
    }
    if (point.y < minY) {
      minY = point.y
    }
    if (point.y > maxY) {
      maxY = point.y
    }
  }
  return {
    rangeX: [minX, maxX],
    rangeY: [minY, maxY],
  }
}

/**
 * Tests if the points are within the polygon. Used for mouse lasso selection
 */
function getPointsWithinPolygon(polygonPoints: { x: number; y: number }[], testPoints: DataPoint[]): DataPoint[] {
  const numPolygonPoints = polygonPoints.length

  // Setup bounding box
  const boundingBox = computeDataRange(polygonPoints)

  const insidePoints: DataPoint[] = []
  for (const p of testPoints) {
    // Test bounding box
    if (
      p.x < boundingBox.rangeX[0] ||
      p.x > boundingBox.rangeX[1] ||
      p.y < boundingBox.rangeY[0] ||
      p.y > boundingBox.rangeY[1]
    ) {
      continue
    }
    // Test polygon via ray tracing
    let isInside = false
    for (let i = 0, j = numPolygonPoints - 1; i < numPolygonPoints; j = i++) {
      if (
        polygonPoints[i].y > p.y != polygonPoints[j].y > p.y &&
        p.x <
          ((polygonPoints[j].x - polygonPoints[i].x) * (p.y - polygonPoints[i].y)) /
            (polygonPoints[j].y - polygonPoints[i].y) +
            polygonPoints[i].x
      ) {
        isInside = !isInside
      }
    }
    if (isInside) {
      insidePoints.push(p)
    }
  }

  return insidePoints
}

interface ScatterPlotProps {
  width: number
  height: number
  data: DataPoint[]
  onSelection?: (selection: DataPoint[]) => void
}

const margin = { top: 10, right: 20, bottom: 20, left: 20 }

export default function ScatterPlot(props: ScatterPlotProps) {
  const theme = useTheme()

  /* The useRef Hook creates a variable that "holds on" to a value across rendering
     passes. In this case it will hold our component's canvas DOM element. It's
     initialized null and React will assign it later (see the return statement) */
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  /** References to the brush object and xScale, so they can be accessed in the brush callback functions */
  const d3ScaleX = React.useRef<d3.ScaleLinear<number, number> | null>(null)
  const d3ScaleY = React.useRef<d3.ScaleLinear<number, number> | null>(null)

  /** State for lasso selection */
  const mouseDown = React.useRef<boolean>(false)
  const mouseSelectionPoints = React.useRef<{ x: number; y: number }[]>([])

  const canvasWidth = Math.floor(props.width)
  const canvasHeight = Math.floor(props.height)

  /**
   * Returns the width, height of the actual chart drawing area (total SVG size minus margins)
   */
  function getChartSize() {
    return {
      chartWidth: props.width - margin.left - margin.right,
      chartHeight: props.height - margin.top - margin.bottom,
    }
  }

  /**********************************************************
   *  Mouse lasso selection
   **********************************************************/

  /**
   * Called only after this component initially mounts.
   * Here the mouse event callbacks are registered to the canvas.
   */
  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.onmousedown = (event: MouseEvent) => {
        const pos = getCoordinatesFromMouseEvent(canvasRef.current!, event)
        mouseDown.current = true
        mouseSelectionPoints.current = [pos]
        requestAnimationFrame(mouseSelectionUpdate)
      }
      canvasRef.current.onmousemove = (event: MouseEvent) => {
        if (mouseDown.current) {
          const pos = getCoordinatesFromMouseEvent(canvasRef.current!, event)
          const lastPos = mouseSelectionPoints.current[mouseSelectionPoints.current.length - 1]
          const diff = Math.pow(pos.x - lastPos.x, 2) + Math.pow(pos.y - lastPos.y, 2)

          // Test minimal distance between last point, to avoid too many
          // points on the selection polygon
          if (diff >= 10) {
            mouseSelectionPoints.current.push(pos)
          }
        }
      }
      canvasRef.current.onmouseup = () => {
        if (props.onSelection && mouseSelectionPoints.current.length > 2) {
          // Convert to data domain coordinates
          const polygonPoints = mouseSelectionPoints.current.map((point) => ({
            x: d3ScaleX.current!.invert(point.x - margin.left),
            y: d3ScaleY.current!.invert(point.y - margin.top),
          }))

          const selectedDataPoints = getPointsWithinPolygon(polygonPoints, props.data)
          props.onSelection(selectedDataPoints)
        }

        mouseDown.current = false
        mouseSelectionPoints.current = []
      }
    }
  }, [])

  /**
   * If mouse selection is active (mouseDown), run draw updates with
   * the browser's animation loop timing. This decouples the drawing from the mousemove
   * events, which might occur much faster, and thus impact performance.
   */
  function mouseSelectionUpdate() {
    if (mouseDown.current) {
      requestAnimationFrame(mouseSelectionUpdate)
    }
    draw()
  }

  function getCoordinatesFromMouseEvent(canvas: HTMLCanvasElement, event: MouseEvent): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / (rect.right - rect.left)) * canvasWidth,
      y: ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvasHeight,
    }
  }

  /**********************************************************
   *  Drawing
   **********************************************************/

  /**
   * This useEffect block is run every time the data or component sizes change. We will do every chart updates here.
   */
  React.useEffect(
    () => {
      if (canvasRef.current) {
        const { chartWidth, chartHeight } = getChartSize()
        const { xScale, yScale } = getScales(props.data, chartWidth, chartHeight)

        d3ScaleX.current = xScale
        d3ScaleY.current = yScale

        draw()
      }
    },
    /* The dependency array of useEffect. This block will run every time the input data or size change */
    [props.data, props.width, props.height, theme]
  )

  function adaptToDevicePixelRatio(ctx: CanvasRenderingContext2D) {
    const dpi = window.devicePixelRatio || 1

    // Set display size (css pixels).
    canvasRef.current!.style.width = canvasWidth + 'px'
    canvasRef.current!.style.height = canvasHeight + 'px'

    // Set actual size in memory (scaled to account for extra pixel density).
    canvasRef.current!.setAttribute('width', (canvasWidth * dpi).toString())
    canvasRef.current!.setAttribute('height', (canvasHeight * dpi).toString())

    // Normalize coordinate system to use css pixels.
    ctx.scale(dpi, dpi)
  }

  function draw() {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        renderScene(ctx)
      }
    }
  }

  function renderScene(ctx: CanvasRenderingContext2D) {
    adaptToDevicePixelRatio(ctx)

    // Clear scene
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Translate for margins
    ctx.translate(margin.left, margin.top)

    ctx.save()
    renderXAxis(ctx)
    ctx.restore()

    ctx.save()
    renderYAxis(ctx)
    ctx.restore()

    ctx.save()
    renderPoints(ctx)
    ctx.restore()

    if (mouseDown.current) {
      ctx.save()
      renderMouseSelection(ctx)
      ctx.restore()
    }
  }

  function renderXAxis(ctx: CanvasRenderingContext2D) {
    const xScale = d3ScaleX.current
    if (!xScale) {
      return
    }

    // Set styles
    ctx.fillStyle = theme.palette.getContrastText(theme.palette.background.default)
    ctx.strokeStyle = theme.palette.getContrastText(theme.palette.background.default)
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    // Translate
    ctx.translate(0, canvasHeight - margin.top - margin.bottom)

    // Axis line
    ctx.beginPath()
    ctx.moveTo(xScale.range()[0] - TICK_MARKER_SIZE, 0)
    ctx.lineTo(xScale.range()[1], 0)
    ctx.stroke()
    ctx.closePath()

    // Axis ticks
    ctx.beginPath()
    xScale.ticks().forEach((tick) => {
      const x = xScale(tick)
      ctx.moveTo(x, 0)
      ctx.lineTo(x, TICK_MARKER_SIZE)
      ctx.stroke()
      ctx.fillText(tick.toString(), x, TICK_MARKER_SIZE + 2)
    })
    ctx.closePath()
  }

  function renderYAxis(ctx: CanvasRenderingContext2D) {
    const yScale = d3ScaleY.current
    if (!yScale) {
      return
    }

    // Set styles
    ctx.fillStyle = theme.palette.getContrastText(theme.palette.background.default)
    ctx.strokeStyle = theme.palette.getContrastText(theme.palette.background.default)
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    // Axis line
    ctx.beginPath()
    ctx.moveTo(0, yScale.range()[0])
    ctx.lineTo(0, yScale.range()[1])
    ctx.stroke()
    ctx.closePath()

    // Axis ticks
    ctx.beginPath()
    yScale.ticks().forEach((tick) => {
      const y = yScale(tick)
      ctx.moveTo(-TICK_MARKER_SIZE, y)
      ctx.lineTo(0, y)
      ctx.stroke()
      ctx.fillText(tick.toString(), -TICK_MARKER_SIZE - 2, y)
    })
    ctx.closePath()
  }

  function renderPoints(ctx: CanvasRenderingContext2D) {
    const xScale = d3ScaleX.current
    const yScale = d3ScaleY.current
    if (!xScale || !yScale) {
      return
    }

    ctx.globalAlpha = 0.8
    ctx.fillStyle = theme.palette.primary.main

    for (const point of props.data) {
      ctx.beginPath()
      ctx.moveTo(xScale(point.x), yScale(point.y))
      ctx.arc(xScale(point.x), yScale(point.y), POINT_RADIUS, 0, 2 * Math.PI, false)
      ctx.fill()
    }
  }

  function renderMouseSelection(ctx: CanvasRenderingContext2D) {
    const linePoints = mouseSelectionPoints.current
    const numLinePoints = linePoints.length
    if (numLinePoints <= 1) {
      return
    }

    ctx.fillStyle = 'rgba(150,150,150,0.4)'
    ctx.strokeStyle = 'rgb(100,100,100)'

    ctx.beginPath()
    ctx.moveTo(linePoints[0].x, linePoints[0].y)
    for (let i = 1; i < numLinePoints; i++) {
      ctx.lineTo(linePoints[i].x - margin.left, linePoints[i].y)
    }
    ctx.fill()
    ctx.stroke()
  }

  return <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef} />
}
