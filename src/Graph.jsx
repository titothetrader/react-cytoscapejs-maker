import React, { useEffect, useRef } from "react";
import $ from "jquery";
import cytoscape from "cytoscape";

// Import Cytoscape Extensions
import cytoCxtMenu from "cytoscape-cxtmenu";
import cytoCompDragDrop from "cytoscape-compound-drag-and-drop";
import cytoLasso from "cytoscape-lasso";
import cytoExpandCollapse from "cytoscape-expand-collapse";
import cytoClipboard from "cytoscape-clipboard";
import cytoUndoRedo from "cytoscape-undo-redo";
import cytoEdgeHandles from "cytoscape-edgehandles";
import cytoAutoPanOnDrag from "cytoscape-autopan-on-drag";

// Tippy used along with Popper
import cytoPopper from "cytoscape-popper";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

// Import Cytoscape Layouts
import fcose from "cytoscape-fcose";
import cola from "cytoscape-cola";
import avsdf from "cytoscape-avsdf";
import cise from "cytoscape-cise";
import coseBilkent from "cytoscape-cose-bilkent";
import dagre from "cytoscape-dagre";
import euler from "cytoscape-euler";
import klay from "cytoscape-klay";
import ngraph from "cytoscape-ngraph.forcelayout";
import spread from "cytoscape-spread";
import springy from "cytoscape-springy";
import evenParent from "cytoscape-even-parent";

// Import custom utilities
import * as graphUtils from "./utils/graphUtils.js";

// import styles
import "./Graph.css";

// Use Cytoscape Extensions
cytoscape.use(cytoCxtMenu);
cytoscape.use(cytoCompDragDrop);
cytoscape.use(cytoLasso);
cytoscape.use(cytoExpandCollapse);
cytoClipboard(cytoscape, $);
cytoscape.use(cytoClipboard);
cytoscape.use(cytoUndoRedo);
cytoscape.use(cytoEdgeHandles);
cytoscape.use(cytoPopper);
cytoscape.use(cytoAutoPanOnDrag);

// Use Cytoscape Layouts - set name as used below
cytoscape.use(fcose);
cytoscape.use(cola);
cytoscape.use(avsdf);
cytoscape.use(cise);
cytoscape.use(coseBilkent); // cose-bilkent
cytoscape.use(dagre);
cytoscape.use(euler);
cytoscape.use(klay);
cytoscape.use(ngraph);
cytoscape.use(spread);
cytoscape.use(springy);
cytoscape.use(evenParent);

function Graph(props) {
  let cy = useRef();
  let cxtMenu = useRef();
  let compDragDrop = useRef();
  let expandCollapse = useRef();
  let clipboard = useRef();
  let undoRedo = useRef();
  let edgeHandles = useRef();
  let autoPanNode = useRef();

  let graphData = props.graphElements;
  let graphStyle = props.graphStyle;
  let graphLayout = props.graphLayout;

  useEffect((props) => {
    console.log("App initialized");
    cy.current = cytoscape({
      container: document.getElementById("cy"),
      elements: graphData,
      style: graphStyle,
      layout: graphLayout,
      wheelSensitivity: 1,
    });
    loadCytoEdgeHandles();
    loadCytoUndoRedo();
    loadCytoCxtMenu();
    loadCytoCompDragDrop();
    loadCytoLasso();
    loadCytoExpandCollapse();
    loadCytoClipboard();
    loadCytoPopper();
    loadCytoTippy();
    loadCytoAutoPanOnDrag();

    cy.current.center();
    cy.current.animate(
      {
        zoom: 1,
        center: { x: 0, y: 0 },
      },
      {
        duration: 1300,
      }
    );

    setupEventListeners();
  });

  const setupEventListeners = () => {
    // Click
    cy.current.on("tap click", function (ele) {
      cy.current.getElementById(ele.target._private.data.id).select();
    });
  };

  const loadCytoEdgeHandles = () => {
    edgeHandles.current = cy.current.edgehandles();
  };

  const loadCytoUndoRedo = () => {
    undoRedo.current = cy.current.undoRedo();
    function deleteEles(eles) {
      return eles.remove();
    }
    function restoreEles(eles) {
      return eles.restore();
    }
    undoRedo.current.action("deleteEles", deleteEles, restoreEles);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Delete" || e.key === "Backspace") {
        let selecteds = cy.current.$(":selected");
        if (selecteds.length > 0) {
          undoRedo.current.do("deleteEles", selecteds);
        }
      } else if (e.ctrlKey && e.target.nodeName === "BODY") {
        if (e.key === "z" || e.key === "Z") {
          undoRedo.current.undo();
        } else if (e.key === "y" || e.key === "Y") {
          undoRedo.current.redo();
        }
      }
    });
  };

  const loadCytoCxtMenu = () => {
    // CxtMenu for Nodes
    cxtMenu.current = cy.current.cxtmenu({
      adaptativeNodeSpotlightRadius: true,
      selector: "node",
      commands: [
        {
          content: "N1",
          select: function (ele) {
            console.log(ele);
          },
          enabled: true,
        },
        {
          content:
            '<i class="fa fa-solid fa-arrow-right-to-bracket fa-2x"></i>',
          select: function (ele) {
            console.log(ele);
            // cy.current.getElementById(ele._private.data.id).select();
            ele.select();
            edgeHandles.current.start(cy.current.$(":selected"));
          },
          enabled: true,
        },
        {
          content: '<i class="fa fa-solid fa-trash-can fa-2x"></i>',
          select: function (ele) {
            console.log(ele);
            undoRedo.current.do("deleteEles", ele);
          },
          enabled: true,
        },
      ],
    });

    // CxtMenu for Edges
    cxtMenu.current = cy.current.cxtmenu({
      selector: "edge",
      commands: [
        {
          content:
            '<i class="fa fa-solid fa-arrow-right-to-bracket fa-2x"></i>',
          select: function (ele) {
            console.log(ele);
          },
          enabled: true,
        },
        {
          content: '<i class="fa fa-solid fa-trash-can fa-2x"></i>',
          select: function (ele) {
            console.log(ele);
            undoRedo.current.do("deleteEles", ele);
          },
          enabled: true,
        },
      ],
    });

    // CxtMenu for BG
    cxtMenu.current = cy.current.cxtmenu({
      selector: "core",
      commands: [
        {
          content: "BG1",
          select: function (ele) {
            console.log(ele);
          },
          enabled: true,
        },
        {
          content: "BG2",
          select: function (ele) {
            console.log(ele);
          },
          enabled: true,
        },
      ],
    });
  };

  const loadCytoCompDragDrop = () => {
    compDragDrop.current = cy.current.compoundDragAndDrop();
  };

  const loadCytoLasso = () => {
    cy.current.lassoSelectionEnabled(false);
  };

  const loadCytoExpandCollapse = () => {
    expandCollapse.current = cy.current.expandCollapse(
      graphUtils.expandCollapseOptions
    );
  };

  const loadCytoClipboard = () => {
    clipboard.current = cy.current.clipboard();
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.target.nodeName === "BODY") {
        if (e.key === "c" || e.key === "C") {
          clipboard.current.copy(cy.current.$(":selected"));
        } else if (e.key === "v" || e.key === "V") {
          undoRedo.current.do("paste");
        }
      } else if (e.key === "a" || e.key === "A") {
        cy.current.elements().select();
        e.preventDefault();
      }
    });
  };

  const loadCytoPopper = () => {
    let nodes = cy.current.nodes();
    let popperDiv = function (text) {
      let div = document.createElement("div");
      div.classList.add("popper-div");
      div.innerHTML = text;
      document.body.appendChild(div);
      return div;
    };
    nodes.forEach((node, i) => {
      let nodeType = node._private.data.type;
      let nodeById = cy.current.getElementById(node._private.data.id);
      let popper = nodeById.popper({
        content: function () {
          return popperDiv("Type: " + nodeType);
        },
      });
      let updatePopper = () => {
        popper.update();
      };
      nodeById.on("position", updatePopper);
      cy.current.on("pan zoom resize", updatePopper);
    });
  };

  const loadCytoTippy = () => {
    cy.current.on("tap", "node", (ele) => {
      console.log(ele.target);
      let nodeById = cy.current.getElementById(ele.target._private.data.id);
      let nodeName = ele.target._private.data.name;
      let popperRef = nodeById.popperRef();
      let tippyDiv = document.createElement("div");
      let tip = new tippy(tippyDiv, {
        getReferenceClientRect: popperRef.getBoundingClientRect,
        trigger: "manual",
        content: () => {
          let content = document.createElement("div");
          content.innerHTML = "Node Name: " + nodeName;
          return content;
        },
        arrow: true,
        placement: "left",
        hideOnClick: true,
        interactive: true,
        appendTo: document.body,
      });
      tip.show();
    });
    cy.current.on("tap", "edge", (ele) => {
      let edgeById = cy.current.getElementById(ele.target._private.data.id);
      let edgeId = ele.target._private.data.id;
      let popperRef = edgeById.popperRef();
      let tippyDiv = document.createElement("div");
      let tip = new tippy(tippyDiv, {
        getReferenceClientRect: popperRef.getBoundingClientRect,
        trigger: "manual",
        content: () => {
          let content = document.createElement("div");
          content.innerHTML = "Edge Id: " + edgeId;
          return content;
        },
        arrow: true,
        placement: "bottom",
        hideOnClick: true,
        interactive: true,
        appendTo: document.body,
      });
      tip.show();
    });
  };

  const loadCytoAutoPanOnDrag = () => {
    autoPanNode.current = cy.current.autopanOnDrag({
      enabled: true,
      selector: "node",
      speed: 2,
    });
    autoPanNode.current.enable();
  };

  // Graph Manipulation Functions
  // Nodes
  const addNode = (props) => {
    cy.current.add();
  };

  // Edges

  return <div id="cy" className="cy" />;
}

export default Graph;
