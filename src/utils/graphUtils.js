import { sampleData } from "./elements.js";

// Graph Layout
export const graphLayout = {
  name: "random",
};

// Graph Elements
// export const graphElements = sampleData;

// Simple GraphElements for testing
export const graphElements = [
  { group: "nodes", data: { id: "a", name: "Node A" }, classes: "nodeHTML" },
  { group: "nodes", data: { id: "b", name: "Node B" } },
  { group: "nodes", data: { id: "c", name: "Node C" }, classes: "nodeHTML" },
  { group: "nodes", data: { id: "d", name: "Node D" } },
  { group: "nodes", data: { id: "e", name: "Node E" }, classes: "nodeHTML" },
  {
    group: "edges",
    data: { id: "ab", source: "a", target: "b", auxNodeId: "ab" },
  },
  { group: "edges", data: { id: "ce", source: "c", target: "e" } },
];

// Graph Styles

export const graphStyle = [
  {
    selector: "node",
    style: {
      shape: "ellipse",
      "background-color": "red",
      label: "data(id)",
      "font-weight": "bold",
    },
  },
  {
    selector: "node:selected",
    style: {
      "border-color": "steelblue",
      "border-width": 3,
    },
  },
  {
    selector: "edge",
    style: {
      width: 3,
      "line-color": "#ccc",
      "target-arrow-color": "#ccc",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
      // label: "data(id)",
    },
  },
  {
    selector: "edge:selected",
    style: {
      "line-color": "steelblue",
      "target-arrow-color": "steelblue",
      "source-arrow-color": "steelblue",
    },
  },
  {
    selector: ":parent",
    style: {
      width: 3,
      "background-opacity": 0.25,
      "background-color": "lightblue",
      shape: "round-rectangle",
    },
  },
  // Compund Drag and Drop Styles
  {
    selector: ".cdnd-grabbed-node",
    style: {
      "background-color": "red",
    },
  },
  {
    selector: ".cdnd-drop-sibling",
    style: {
      "background-color": "red",
    },
  },
  {
    selector: ".cdnd-drop-target",
    style: {
      "border-color": "red",
      "border-style": "dashed",
    },
  },
  // Expand Collapse Styles
  {
    selector: "node.cy-expand-collapse-collapsed-node",
    style: {
      "background-color": "darkblue",
      shape: "rectangle",
    },
  },
  // EdgeHandles Styles
  {
    selector: ".eh-hover",
    style: {
      "background-color": "red",
    },
  },
  {
    selector: ".eh-source",
    style: {
      "border-width": 2,
      "border-color": "red",
    },
  },
  {
    selector: ".eh-target",
    style: {
      "border-width": 2,
      "border-color": "red",
    },
  },
  {
    selector: ".eh-preview, .eh-ghost-edge",
    style: {
      "background-color": "red",
      "line-color": "red",
      "target-arrow-color": "red",
      "source-arrow-color": "red",
    },
  },
  {
    selector: ".eh-ghost-edge.eh-preview-active",
    style: {
      opacity: 0,
    },
  },
  // Edge Connections
  {
    selector: "node.aux-node",
    style: {
      label: "",
      "background-color": "steelblue",
      "line-color": "steelblue",
      "target-arrow-color": "steelblue",
      "source-arrow-color": "steelblue",
    },
  },
];

// Expand Collapse
export const expandCollapseOptions = {
  layoutBy: {
    name: "preset",
    animate: true,
    randomize: false,
    fit: true,
  },
  fisheye: true,
  animate: true,
  undoable: false,
  expandCuelmage: "./assets/icons/icon-plus.png",
  collapseCuelmage: "./assets/icons/icon-minus.png",
};
