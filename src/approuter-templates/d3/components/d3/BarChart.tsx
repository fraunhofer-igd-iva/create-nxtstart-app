import React from 'react'
import * as d3 from 'd3'
import { Data } from '@/util/types'
import { useTheme } from '@mui/material'

/**
 * Computes the linear scales for the x and y dimension for the given data and chart sizes
 */
function getScales(data: Data[], chartWidth: number, chartHeight: number) {
  return {
    xScale: d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, chartWidth])
      .padding(0.2),
    yScale: d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)! < 1 ? 1 : (d3.max(data, (d) => d.value) as number)])
      .range([chartHeight, 0])
      .nice(),
  }
}

interface BarChartProps {
  width: number
  height: number
  data: Data[]
}

const margin = { top: 10, right: 20, bottom: 90, left: 60 }

export default function BarChart(props: BarChartProps) {
  const theme = useTheme()

  /* The useRef Hook creates a variable that "holds on" to a value across rendering
     passes. In this case it will hold our component's SVG DOM element. It's
     initialized null and React will assign it later (see the return statement) */
  const d3Container = React.useRef<SVGSVGElement>(null)

  /** References to the brush object and xScale, so they can be accessed in the brush callback functions */
  const d3Brush = React.useRef<d3.BrushBehavior<unknown> | null>(null)
  const d3ScaleX = React.useRef<d3.ScaleBand<string> | null>(null)

  /**
   * Returns the width, height of the actual chart drawing area (total SVG size minus margins)
   */
  const getChartSize = () => {
    return {
      chartWidth: props.width - margin.left - margin.right,
      chartHeight: props.height - margin.top - margin.bottom,
    }
  }

  /**
   * This useEffect block is run only once after the component mounts. We will do the initial D3 setup here.
   */
  React.useEffect(
    () => {
      if (d3Container.current) {
        const svg = d3.select(d3Container.current)

        const { chartWidth, chartHeight } = getChartSize()
        const { xScale, yScale } = getScales(props.data, chartWidth, chartHeight)

        // Add the chart drawing area (group with margin translations)
        const svgChart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

        // Create group that will later hold the bars' <rect> elements
        svgChart.append('g').attr('class', 'bars')

        // Create and add brushing
        const brush = d3
          .brushX<unknown>()
          .extent([
            [0, 0],
            [chartWidth, chartHeight],
          ])
          .on('end', onBrushEnd)

        svgChart.append('g').attr('class', 'brush').call(brush)

        // Store brush and scale in ref, so we can access it in onBrushEnd function
        d3Brush.current = brush
        d3ScaleX.current = xScale

        // Add X axis
        svgChart
          .append('g')
          .attr('class', 'xAxis')
          .attr('transform', `translate(0, ${chartHeight})`)
          .call(d3.axisBottom(xScale))

        // Add Y axis
        svgChart.append('g').attr('class', 'yAxis').call(d3.axisLeft(yScale))
      }

      function onBrushEnd(event: d3.D3BrushEvent<unknown>) {
        // Define type to 1D range (number[]) - if you are using a 2D brushXY set to [[number, number], [number, number]]
        const extent = event.selection as number[] | null

        if (extent) {
          if (d3ScaleX.current) {
            const bandwidth = d3ScaleX.current.bandwidth()

            const selection: string[] = []
            // Test which bands are within the selection area
            for (const value of d3ScaleX.current.domain()) {
              const bandStart = d3ScaleX.current(value) as number
              const bandEnd = bandStart + bandwidth
              if (extent[0] < bandEnd && extent[1] > bandStart) {
                selection.push(value)
              }
            }
            console.log(selection)
          }

          if (d3Brush.current) {
            const svg = d3.select(d3Container.current)

            // This removes the grey brush area as soon as the selection has been done
            // Remove this if you want the selection area to persist
            svg.select('.brush').call(d3Brush.current.move as () => void)
          }
        } else {
          // Selection reset - in case you want to do something here
        }
      }
    },
    /* The empty dependency array of useEffect. This block will run only once after mount. */
    []
  )

  /**
   * This useEffect block is run every time the data or component sizes change. We will do every chart updates here.
   */
  React.useEffect(
    () => {
      if (d3Container.current) {
        const { chartWidth, chartHeight } = getChartSize()
        const { xScale, yScale } = getScales(props.data, chartWidth, chartHeight)

        const svg = d3.select(d3Container.current)

        // Update X Axis (Note: instead of .select we could also store a ref for this object - likely more efficient)
        svg
          .select<SVGGElement>('.xAxis')
          .attr('transform', `translate(0, ${chartHeight})`)
          .transition()
          .duration(500)
          .call(d3.axisBottom(xScale))

        // Enable this, if you want 45° rotated axis markers
        svg
          .select<SVGGElement>('.xAxis')
          .selectAll('text')
          .attr('transform', 'translate(-10,0)rotate(-45)')
          .style('text-anchor', 'end')

        // Update Y Axis
        svg.select<SVGGElement>('.yAxis').call(d3.axisLeft(yScale))

        d3ScaleX.current = xScale

        // Update brush
        if (d3Brush.current) {
          d3Brush.current.extent([
            [0, 0],
            [chartWidth, chartHeight],
          ])

          svg.select<SVGGElement>('.brush').call(d3Brush.current)
        }

        // Update data point rects (Note: instead of .select we could also store a ref for this object - likely more efficient)
        const barsGroup = svg.select('.bars')

        const bars = barsGroup.selectAll<SVGGElement, Data>('rect').data(props.data)

        // Enter new elements
        bars
          .enter()
          .append('rect')
          .attr('x', (d) => xScale(d.label) as number)
          .attr('y', (d) => yScale(d.value))
          .attr('height', (d) => chartHeight - yScale(d.value))
          .attr('width', xScale.bandwidth())
          .style('fill', theme.palette.primary.main)

        // Update existing  elements
        bars
          .transition()
          .duration(500)
          .attr('x', (d) => xScale(d.label) as number)
          .attr('y', (d) => yScale(d.value))
          .attr('height', (d) => chartHeight - yScale(d.value))
          .attr('width', xScale.bandwidth())

        // Remove old elements
        bars.exit().remove()
      }
    },
    /* The dependency array of useEffect. This block will run every time the input data or size change */
    [props.data, props.height, props.width]
  )

  return <svg width={props.width} height={props.height} ref={d3Container} />
}
