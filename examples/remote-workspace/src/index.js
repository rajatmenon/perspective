/******************************************************************************
 *
 * Copyright (c) 2018, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import perspective from "@finos/perspective";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import "@finos/perspective-workspace";

import "./index.less";

window.addEventListener("load", () => {
    const websocket = perspective.websocket("ws://localhost:8080");
    const table = websocket.open_table("securities");

    const workspace = document.createElement("perspective-workspace");
    document.body.appendChild(workspace);

    workspace.tables.set("superstore", table);

    workspace.restore({
        detail: {
            main: {
                type: "split-area",
                orientation: "horizontal",
                children: [
                    {
                        type: "tab-area",
                        widgets: ["One"],
                        currentIndex: 0
                    },
                    {
                        type: "tab-area",
                        widgets: ["Two"],
                        currentIndex: 0
                    }
                ],
                sizes: [0.5, 0.5]
            }
        },
        viewers: {
            One: {table: "superstore", name: "Heat Map", plugin: "heatmap", "row-pivots": ["client"], columns: ["chg"], "column-pivots": '["name"]'},
            Two: {table: "superstore", name: "Bar Chart", plugin: "x_bar", "row-pivots": ["client"], columns: ["chg"]}
        }
    });

    window.workspace = workspace;
});
