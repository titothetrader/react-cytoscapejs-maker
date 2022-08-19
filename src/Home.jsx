import Graph from "./Graph";
import * as graphUtils from "./utils/graphUtils.js";

export let currentGraphElements = graphUtils.graphElements;
export let currentGraphLayout = graphUtils.graphLayout;
export let currentGraphStyle = graphUtils.graphStyle;

export default function Home() {
  return (
    <div className="container">
      <h1>
        Hello World
        <i className="fa fa-solid fa-coffee fa-2x"></i>
      </h1>
      <Graph
        graphElements={currentGraphElements}
        graphStyle={currentGraphStyle}
        graphLayout={currentGraphLayout}
      />
    </div>
  );
}
