// function toggleActionMenu() {
//   $("#actions").toggle();
// }
// thay đổi trạng thái thanh điều hướng (đóng/mở)

// Graph DS actions
var actionsWidth = 170;

function hideEntireActionsPanel() {
  hideActionsPanel();
}

$(function () {
  var options;
  $("#menu1").on('click', function () {
    options = ['CP3Fig2.4', 'CP3Fig2.4_disjoint', 'tree', 'bipartite'];
    GraphVisu(true, true, options[Math.floor(Math.random() * 4)]);
  });
  $("#menu2").on('click', function () {
    options = ['CP3Fig4.10', 'k5', 'star'];
    GraphVisu(true, false, options[Math.floor(Math.random() * 3)]);
  });
  $("#menu3").on('click', function () {
    options = ['CP3Fig4.4', 'cyclic'];
    GraphVisu(false, true, options[Math.floor(Math.random() * 2)]);
  });
  $("#menu4").on('click', function () {
    options = ['CP3Fig4.26B', 'sssp'];
    GraphVisu(false, false, options[Math.floor(Math.random() * 2)]);
  });

  $("#menu" + (Math.floor(Math.random() * 4) + 1)).click(); // random :O
});

function GraphVisu(arg1, arg2, arg3) {
  var menu = (arg1 === false ? 1 : 0) * 2 + (arg2 === false ? 1 : 0) + 1; // toggle correct menu item
  $("#menu1").removeClass('selected-viz');
  $("#menu1").html("U/U");
  $("#menu2").removeClass('selected-viz');
  $("#menu2").html("U/W");
  $("#menu3").removeClass('selected-viz');
  $("#menu3").html("D/U");
  $("#menu4").removeClass('selected-viz');
  $("#menu4").html("D/W");
  $("#menu" + menu.toString()).toggleClass('selected-viz');
  switch (menu) {
    case 1:
      $("#menu1").html("VÔ HƯỚNG/KHÔNG TRỌNG SỐ");
      break;
    case 2:
      $("#menu2").html("VÔ HƯỚNG/CÓ TRỌNG SỐ");
      break;
    case 3:
      $("#menu3").html("CÓ HƯỚNG/KHÔNG TRỌNG SỐ");
      break;
    case 4:
      $("#menu4").html("CÓ HƯỚNG/CÓ TRỌNG SỐ");
      break;
  }
  window.scrollTo(0, 100);
  var UNDIRECTED = arg1,
    UNWEIGHTED = arg2;
  var maxNumberVertex = 10;
  var grid = 20;
  var width = 640,
    height = 360,
    colors = d3.scale.category10();

  // clear stuff
  d3.select("#viz")
    .selectAll('svg')
    .remove();
  var svg = d3
    .select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var countNodeId = new Array(maxNumberVertex);
  for (var i = countNodeId.length; i >= 0; i--) countNodeId[i] = 0;

  var nodes = [{
      id: 0,
      x: 160,
      y: 90
    },
    {
      id: 1,
      x: 320,
      y: 180
    },
    {
      id: 2,
      x: 480,
      y: 270
    }
  ];
  var lastNodeId = 3;

  var links;
  if (UNWEIGHTED === true)
    links = [{
        source: nodes[0],
        target: nodes[1]
      },
      {
        source: nodes[1],
        target: nodes[2]
      }
    ];
  else
    links = [{
        source: nodes[0],
        target: nodes[1],
        weight: 2
      },
      {
        source: nodes[1],
        target: nodes[2],
        weight: 3
      }
    ];

  // if (arg3 === "CP4.2") {
  //   nodes = [{id:0,x:220,y:100},{id:1,x:220,y:200},{id:2,x:220,y:300},{id:3,x:220,y:400},{id:4,x:360,y:100},{id:5,x:360,y:200},{id:6,x:360,y:400},{id:7,x:500,y:100},{id:8,x:500,y:200},{id:9,x:500,y:400}];
  //   links = [{source:{id:0,x:220,y:100},target:{id:1,x:220,y:200}},{source:{id:1,x:220,y:200},target:{id:2,x:220,y:300}},{source:{id:0,x:220,y:100},target:{id:4,x:360,y:100}},{source:{id:4,x:360,y:100},target:{id:7,x:500,y:100}},{source:{id:5,x:360,y:200},target:{id:8,x:500,y:200}},{source:{id:4,x:360,y:100},target:{id:5,x:360,y:200}},{source:{id:5,x:360,y:200},target:{id:6,x:360,y:400}},{source:{id:7,x:500,y:100},target:{id:8,x:500,y:200}},{source:{id:8,x:500,y:200},target:{id:9,x:500,y:400}},{source:{id:2,x:220,y:300},target:{id:3,x:220,y:400}},{source:{id:3,x:220,y:400},target:{id:6,x:360,y:400}},{source:{id:6,x:360,y:400},target:{id:9,x:500,y:400}}];
  // }

  // if (arg3 === "CP4.5") {
  //   nodes = [{id:0,x:200,y:100},{id:1,x:400,y:100},{id:2,x:580,y:100},{id:3,x:200,y:240},{id:4,x:400,y:240},{id:5,x:580,y:240}];
  //   links = [{source:{id:0,x:200,y:100},target:{id:1,x:400,y:100}},{source:{id:1,x:400,y:100},target:{id:2,x:580,y:100}},{source:{id:1,x:400,y:100},target:{id:3,x:200,y:240}},{source:{id:1,x:400,y:100},target:{id:4,x:400,y:240}},{source:{id:4,x:400,y:240},target:{id:5,x:580,y:240}},{source:{id:1,x:400,y:100},target:{id:5,x:580,y:240}}];
  // }

  // if (arg3 === "CP2.5A") {
  //   nodes = [{id:0,x:100,y:100},{id:1,x:100,y:200},{id:2,x:100,y:300},{id:3,x:260,y:100},{id:4,x:260,y:200},{id:5,x:260,y:300},{id:6,x:420,y:100},{id:7,x:420,y:200},{id:8,x:420,y:300}];
  //   links = [{source:{id:0,x:100,y:100},target:{id:1,x:100,y:200}},{source:{id:1,x:100,y:200},target:{id:2,x:100,y:300}},{source:{id:2,x:100,y:300},target:{id:5,x:260,y:300}},{source:{id:5,x:260,y:300},target:{id:8,x:420,y:300}},{source:{id:8,x:420,y:300},target:{id:7,x:420,y:200}},{source:{id:7,x:420,y:200},target:{id:6,x:420,y:100}}];
  // }

  // if (arg3 === "CP2.5B") {
  //   nodes = [{id:0,x:100,y:100},{id:1,x:100,y:200},{id:2,x:100,y:300},{id:3,x:260,y:100},{id:4,x:260,y:200},{id:5,x:260,y:300},{id:6,x:420,y:100},{id:7,x:420,y:200},{id:8,x:420,y:300}];
  //   links = [{source:{id:0,x:100,y:100},target:{id:1,x:100,y:200}},{source:{id:1,x:100,y:200},target:{id:2,x:100,y:300}},{source:{id:2,x:100,y:300},target:{id:5,x:260,y:300}},{source:{id:5,x:260,y:300},target:{id:8,x:420,y:300}},{source:{id:8,x:420,y:300},target:{id:7,x:420,y:200}},{source:{id:7,x:420,y:200},target:{id:6,x:420,y:100}},{source:{id:3,x:260,y:100},target:{id:4,x:260,y:200}},{source:{id:4,x:260,y:200},target:{id:5,x:260,y:300}},{source:{id:1,x:100,y:200},target:{id:4,x:260,y:200}},{source:{id:0,x:100,y:100},target:{id:3,x:260,y:100}}];
  // }

  // will make two examples per category later?
  if (arg3 === "CP3Fig2.4") {
    nodes = [{
        id: 0,
        x: 220,
        y: 270
      },
      {
        id: 1,
        x: 120,
        y: 180
      },
      {
        id: 2,
        x: 320,
        y: 180
      },
      {
        id: 3,
        x: 120,
        y: 90
      },
      {
        id: 4,
        x: 320,
        y: 90
      },
      {
        id: 5,
        x: 520,
        y: 90
      },
      {
        id: 6,
        x: 520,
        y: 180
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 4
        }
      },
      {
        source: {
          id: 4
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 4
        },
        target: {
          id: 5
        }
      },
      {
        source: {
          id: 5
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 0
        }
      }
    ];
  } else if (arg3 === "aaaaa") {
    nodes = [{
        id: 0,
        x: 220,
        y: 270
      },
      {
        id: 1,
        x: 120,
        y: 180
      },
      {
        id: 2,
        x: 320,
        y: 180
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        },
        weight: "2"
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 2
        },
        weight: "7"
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        },
        weight: "4"
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 0
        },
        weight: "1"
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 1
        },
        weight: "4"
      }
    ];
  } else if (arg3 === "CP3Fig2.4_disjoint") {
    nodes = [{
        id: 0,
        x: 220,
        y: 270
      },
      {
        id: 1,
        x: 120,
        y: 180
      },
      {
        id: 2,
        x: 320,
        y: 180
      },
      {
        id: 3,
        x: 120,
        y: 90
      },
      {
        id: 4,
        x: 320,
        y: 90
      },
      {
        id: 5,
        x: 520,
        y: 90
      },
      {
        id: 6,
        x: 520,
        y: 180
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 4
        }
      },
      {
        source: {
          id: 4
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 5
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 0
        }
      }
    ];
  } else if (arg3 === "tree") {
    nodes = [{
        id: 0,
        x: 320,
        y: 50
      },
      {
        id: 1,
        x: 160,
        y: 125
      },
      {
        id: 2,
        x: 100,
        y: 200
      },
      {
        id: 3,
        x: 160,
        y: 200
      },
      {
        id: 4,
        x: 140,
        y: 275
      },
      {
        id: 5,
        x: 180,
        y: 275
      },
      {
        id: 6,
        x: 220,
        y: 200
      },
      {
        id: 7,
        x: 480,
        y: 125
      },
      {
        id: 8,
        x: 400,
        y: 200
      },
      {
        id: 9,
        x: 560,
        y: 200
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 3
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 4
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 5
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 7
        }
      },
      {
        source: {
          id: 7
        },
        target: {
          id: 8
        }
      },
      {
        source: {
          id: 7
        },
        target: {
          id: 9
        }
      }
    ];
  } else if (arg3 === "binarytree") {
    nodes = [{
        id: 0,
        x: 320,
        y: 50
      },
      {
        id: 1,
        x: 160,
        y: 125
      },
      {
        id: 2,
        x: 100,
        y: 200
      },
      {
        id: 4,
        x: 200,
        y: 275
      },
      {
        id: 5,
        x: 240,
        y: 275
      },
      {
        id: 6,
        x: 220,
        y: 200
      },
      {
        id: 7,
        x: 480,
        y: 125
      },
      {
        id: 8,
        x: 400,
        y: 200
      },
      {
        id: 3,
        x: 560,
        y: 200
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 7
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 6
        },
        target: {
          id: 4
        }
      },
      {
        source: {
          id: 6
        },
        target: {
          id: 5
        }
      },
      {
        source: {
          id: 7
        },
        target: {
          id: 8
        }
      },
      {
        source: {
          id: 7
        },
        target: {
          id: 3
        }
      }
    ];
  } else if (arg3 === "bipartite") {
    nodes = [{
        id: 0,
        x: 200,
        y: 50
      },
      {
        id: 1,
        x: 200,
        y: 110
      },
      {
        id: 2,
        x: 200,
        y: 170
      },
      {
        id: 3,
        x: 200,
        y: 230
      },
      {
        id: 4,
        x: 200,
        y: 290
      },
      {
        id: 5,
        x: 400,
        y: 50
      },
      {
        id: 6,
        x: 400,
        y: 110
      },
      {
        id: 7,
        x: 400,
        y: 170
      },
      {
        id: 8,
        x: 400,
        y: 230
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 5
        }
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 7
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 7
        }
      },
      {
        source: {
          id: 4
        },
        target: {
          id: 7
        }
      }
    ];
  } else if (arg3 === "CP2.5C") {
    nodes = [{
        id: 0,
        x: 100,
        y: 75
      },
      {
        id: 1,
        x: 100,
        y: 175
      },
      {
        id: 2,
        x: 100,
        y: 275
      },
      {
        id: 3,
        x: 250,
        y: 75
      },
      {
        id: 4,
        x: 250,
        y: 175
      },
      {
        id: 5,
        x: 250,
        y: 275
      },
      {
        id: 6,
        x: 400,
        y: 75
      },
      {
        id: 7,
        x: 400,
        y: 175
      },
      {
        id: 8,
        x: 400,
        y: 275
      },
      {
        id: 9,
        x: 550,
        y: 75
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 5
        }
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 7
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 8
        }
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 3
        }
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 7
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 8
        }
      },
      {
        source: {
          id: 4
        },
        target: {
          id: 9
        }
      },
      {
        source: {
          id: 5
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 8
        },
        target: {
          id: 9
        }
      }
    ];
  } else if (arg3 === "CP3Fig4.10") {
    nodes = [{
        id: 0,
        x: 220,
        y: 130
      },
      {
        id: 1,
        x: 320,
        y: 30
      },
      {
        id: 2,
        x: 420,
        y: 130
      },
      {
        id: 3,
        x: 320,
        y: 230
      },
      {
        id: 4,
        x: 220,
        y: 330
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        },
        weight: "4"
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        },
        weight: "2"
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 3
        },
        weight: "8"
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 0
        },
        weight: "6"
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 2
        },
        weight: "4"
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 4
        },
        weight: "9"
      },
      {
        source: {
          id: 4
        },
        target: {
          id: 0
        },
        weight: "6"
      }
    ];
  } else if (arg3 === "k5") {
    nodes = [{
        id: 0,
        x: 160,
        y: 130
      },
      {
        id: 1,
        x: 480,
        y: 130
      },
      {
        id: 2,
        x: 220,
        y: 290
      },
      {
        id: 3,
        x: 320,
        y: 50
      },
      {
        id: 4,
        x: 420,
        y: 290
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        },
        weight: "1"
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        },
        weight: "2"
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 3
        },
        weight: "3"
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 4
        },
        weight: "4"
      },
      {
        source: {
          id: 4
        },
        target: {
          id: 0
        },
        weight: "5"
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 3
        },
        weight: "6"
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 1
        },
        weight: "7"
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 4
        },
        weight: "8"
      },
      {
        source: {
          id: 4
        },
        target: {
          id: 2
        },
        weight: "9"
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 0
        },
        weight: "10"
      }
    ];
  } else if (arg3 === "star") {
    nodes = [{
        id: 0,
        x: 300,
        y: 160
      },
      {
        id: 1,
        x: 300,
        y: 60
      },
      {
        id: 2,
        x: 380,
        y: 120
      },
      {
        id: 3,
        x: 340,
        y: 240
      },
      {
        id: 4,
        x: 260,
        y: 240
      },
      {
        id: 5,
        x: 220,
        y: 120
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        },
        weight: "1"
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 2
        },
        weight: "7"
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 3
        },
        weight: "8"
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 4
        },
        weight: "5"
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 5
        },
        weight: "3"
      },
    ];
  } else if (arg3 === "CP3Fig4.4") {
    nodes = [{
        id: 0,
        x: 100,
        y: 100
      },
      {
        id: 1,
        x: 210,
        y: 100
      },
      {
        id: 2,
        x: 210,
        y: 210
      },
      {
        id: 3,
        x: 320,
        y: 100
      },
      {
        id: 4,
        x: 430,
        y: 100
      },
      {
        id: 5,
        x: 540,
        y: 100
      },
      {
        id: 6,
        x: 430,
        y: 210
      },
      {
        id: 7,
        x: 540,
        y: 210
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 7
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 5
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 4
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 3
        }
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 3
        }
      }
    ];
  } else if (arg3 === "CP3Fig4.8") {
    nodes = [{
        id: 0,
        x: 100,
        y: 100
      },
      {
        id: 1,
        x: 210,
        y: 100
      },
      {
        id: 2,
        x: 210,
        y: 210
      },
      {
        id: 3,
        x: 320,
        y: 100
      },
      {
        id: 4,
        x: 430,
        y: 100
      },
      {
        id: 5,
        x: 540,
        y: 100
      },
      {
        id: 6,
        x: 430,
        y: 210
      },
      {
        id: 7,
        x: 540,
        y: 210
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 3
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 4
        }
      },
      {
        source: {
          id: 4
        },
        target: {
          id: 5
        }
      },
      {
        source: {
          id: 5
        },
        target: {
          id: 7
        }
      },
      {
        source: {
          id: 7
        },
        target: {
          id: 6
        }
      },
      {
        source: {
          id: 6
        },
        target: {
          id: 4
        }
      }
    ];
  } else if (arg3 === "cyclic") {
    nodes = [{
        id: 0,
        x: 120,
        y: 250
      },
      {
        id: 1,
        x: 320,
        y: 100
      },
      {
        id: 2,
        x: 520,
        y: 250
      },
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        }
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        }
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 0
        }
      }
    ];
  } else if (arg3 === "MaIN") {
    nodes = [];
    links = [];
    nodes = Adja_Matrix;
    links = Adja_Matrix_E;
  } else if (arg3 === "CP3Fig4.26B") {
    nodes = [{
        id: 0,
        x: 95,
        y: 180
      },
      {
        id: 1,
        x: 245,
        y: 100
      },
      {
        id: 2,
        x: 245,
        y: 260
      },
      {
        id: 3,
        x: 395,
        y: 260
      },
      {
        id: 4,
        x: 545,
        y: 180
      }
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        },
        weight: "99"
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 2
        },
        weight: "50"
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        },
        weight: "50"
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 3
        },
        weight: "50"
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 4
        },
        weight: "50"
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 3
        },
        weight: "99"
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 4
        },
        weight: "75"
      }
    ];
  } else if (arg3 === "sssp") {
    nodes = [{
        id: 0,
        x: 120,
        y: 250
      },
      {
        id: 1,
        x: 220,
        y: 100
      },
      {
        id: 2,
        x: 320,
        y: 250
      },
      {
        id: 3,
        x: 420,
        y: 100
      },
      {
        id: 4,
        x: 520,
        y: 250
      },
    ];
    links = [{
        source: {
          id: 0
        },
        target: {
          id: 1
        },
        weight: "2"
      },
      {
        source: {
          id: 0
        },
        target: {
          id: 2
        },
        weight: "7"
      },
      {
        source: {
          id: 1
        },
        target: {
          id: 2
        },
        weight: "4"
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 3
        },
        weight: "1"
      },
      {
        source: {
          id: 2
        },
        target: {
          id: 4
        },
        weight: "4"
      },
      {
        source: {
          id: 3
        },
        target: {
          id: 4
        },
        weight: "2"
      },
    ];
  }

  // magic function
  lastNodeId = nodes.length;
  for (var i = 0; i < nodes.length; i++) countNodeId[nodes[i].id]++;

  for (var i = 0; i < links.length; i++)
    for (var j = 0; j < nodes.length; j++) {
      if (nodes[j].id === links[i].source.id) links[i].source = nodes[j];
      if (nodes[j].id === links[i].target.id) links[i].target = nodes[j];
    }
  // end of magic

  svg
    .append('svg:defs')
    .append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');

  var drag_line = svg
    .append('svg:path')
    .attr('class', 'link dragline hidden')
    .attr('d', 'M0,0L0,0');

  var path, circle, weight;
  var selected_node = null,
    selected_link = null,
    mousedown_link = null,
    mousedown_node = null,
    mouseup_node = null;

  function resetMouseVars() {
    mousedown_node = null;
    mouseup_node = null;
    mousedown_link = null;
  }

  function restart() { // redraw everything
    svg
      .selectAll('g')
      .remove();

    path = svg
      .append('svg:g')
      .selectAll('path');

    circle = svg
      .append('svg:g')
      .selectAll('g');

    weight = svg
      .append('svg:g')
      .selectAll('text');

    circle = circle.data(nodes, function (d) {
      return d.id;
    });
    circle.selectAll('circle').style('fill', function (d) {
      return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id);
    });

    var g = circle
      .enter()
      .append('svg:g');

    g.append('svg:circle')
      .attr('class', 'node')
      .attr('r', 16)
      .attr('cx', function (d) {
        return d.x;
      })
      .attr('cy', function (d) {
        return d.y;
      })
      .style('fill', function (d) {
        return (d === selected_node) ? d3.rgb(255, 138, 39) : d3.rgb(238, 238, 238);
      })
      .on('mousedown', function (d) {
        if (d3.event.ctrlKey) return;

        mousedown_node = d;
        if (mousedown_node === selected_node) selected_node = null;
        else selected_node = mousedown_node;

        selected_link = null;

        // reposition drag line
        drag_line
          .style('marker-end', 'url(#end-arrow)')
          .classed('hidden', false)
          .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' +
            mousedown_node.y);

        restart();
      })
      .on('mouseup', function (d) {
        if (!mousedown_node) return;

        drag_line
          .classed('hidden', true)
          .style('marker-end', '');

        // check for drag-to-self
        mouseup_node = d;
        if (mouseup_node === mousedown_node) {
          resetMouseVars();
          return;
        }

        var source, target, direction;

        source = mousedown_node;
        target = mouseup_node;

        var link;

        if (UNDIRECTED === false) {
          link = links.filter(function (l) {
            return (l.source === source && l.target === target);
          })[0];
        } else {
          link = links.filter(function (l) {
            return (l.source === source && l.target === target) || (l.source === target && l.target ===
              source);
          })[0];
        }

        if (!link) {
          if (UNWEIGHTED === false) {
            var dist = parseInt(Math.sqrt(Math.pow(source.x - target.x, 2) + Math.pow(source.y - target.y, 2)) /
              100 + 1);
            link = {
              source: source,
              target: target,
              weight: dist
            };
            links.push(link);
          } else {
            link = {
              source: source,
              target: target
            };
            links.push(link);
          }
        }

        // select new link
        selected_link = link;
        selected_node = null;
        restart();
      });

    g.append('svg:text')
      .attr('x', function (d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y + 16 / 3;
      })
      .attr('class', 'id')
      .text(function (d) {
        return d.id;
      });

    // drawing paths
    path = path
      .data(links);

    path
      .classed('selected', function (d) {
        return d === selected_link;
      });

    path
      .enter().append('svg:path')
      .attr('class', 'link')
      .classed('selected', function (d) {
        return d === selected_link;
      })
      .style('marker-end', function (d) {
        if (UNDIRECTED === false) return 'url(#end-arrow)';
      })
      .attr('d', function (d) {
        var deltaX = d.target.x - d.source.x,
          deltaY = d.target.y - d.source.y,
          dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
          normX = deltaX / dist,
          normY = deltaY / dist,

          sourcePadding = 12;
        targetPadding = 17;
        if (UNDIRECTED === true) targetPadding = 12;
        sourceX = d.source.x + (sourcePadding * normX);
        sourceY = d.source.y + (sourcePadding * normY);
        targetX = d.target.x - (targetPadding * normX);
        targetY = d.target.y - (targetPadding * normY);

        if (UNDIRECTED === true)
          return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;

        // check if needs to draw curve or not ?
        var link;
        link = links.filter(function (l) {
          return (l.source === d.target && l.target === d.source);
        })[0];

        if (link) { // need arrow
          var type;
          if (d.source.id < d.target.id) type = 1;
          else type = 2;

          // change final point of arrow
          var finalX = arrowXY(sourceX, sourceY, targetX, targetY, type).x;
          var finalY = arrowXY(sourceX, sourceY, targetX, targetY, type).y;

          var beginX = arrowXY(targetX, targetY, sourceX, sourceY, type).x;
          var beginY = arrowXY(targetX, targetY, sourceX, sourceY, type).y;
          return 'M' + beginX + ',' + beginY + 'L' + finalX + ',' + finalY;
        } else // no need
          return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
        // end check
      })
      .on('mousedown', function (d) {
        if (d3.event.ctrlKey) return;

        // select link
        mousedown_link = d;
        if (mousedown_link === selected_link) selected_link = null;
        else selected_link = mousedown_link;
        selected_node = null;
        restart();
      });

    if (UNWEIGHTED === false) { // start weight display
      weight = weight.data(links);

      weight
        .enter().append('svg:text')
        .attr('class', 'weight')
        .attr('x', function (d) {
          var type;
          if (d.source.id < d.target.id) type = 1;
          else type = 2;

          var link;
          link = links.filter(function (l) {
            return (l.source === d.target && l.target === d.source);
          })[0];

          var curve = 0;
          if (link) curve = 2;

          var x = weightXY(d.source.x, d.source.y, d.target.x, d.target.y, type, curve).x;
          return x;
        })
        .attr('y', function (d) {
          var type;
          if (d.source.id < d.target.id) type = 1;
          else type = 2;

          var link;
          link = links.filter(function (l) {
            return (l.source === d.target && l.target === d.source);
          })[0];

          var curve = 0;
          if (link) curve = 2;

          var y = weightXY(d.source.x, d.source.y, d.target.x, d.target.y, type, curve).y;
          return y;
        })
        .text(function (d) {
          return d.weight;
        });
    }

    var maxNodeId = -1;
    var countNode = nodes.length;
    var countEdge = links.length;
    var adjMat = [];
    var M = [];

    for (var i = 0; i < nodes.length; i++)
      if (nodes[i].id > maxNodeId)
        maxNodeId = nodes[i].id;

    maxNodeId++;
    // adjacency matrix
    var validNode = new Array(maxNodeId);

    for (var i = 0; i < maxNodeId; i++) validNode[i] = false;
    for (var i = 0; i < nodes.length; i++) validNode[nodes[i].id] = true;

    for (var i = 0; i < maxNodeId; i++) {
      adjMat[i] = [];
      M[i] = [];
      for (var j = 0; j < maxNodeId; j++)
        if (validNode[i] === true && validNode[j] === true) {
          adjMat[i][j] = "0";
          M[i][j] = 0;
        }
      else {
        adjMat[i][j] = "x";
        M[i][j] = -1;
      }
      M[i][i] = 0;
    }

    if (UNDIRECTED === true) {
      if (UNWEIGHTED === true) {
        for (var i = 0; i < links.length; i++) {
          adjMat[links[i].source.id][links[i].target.id] = "1";
          adjMat[links[i].target.id][links[i].source.id] = "1";
          M[links[i].source.id][links[i].target.id] = 1;
          M[links[i].target.id][links[i].source.id] = 1;
        }
      } else {
        for (var i = 0; i < links.length; i++) {
          adjMat[links[i].source.id][links[i].target.id] = links[i].weight.toString();
          adjMat[links[i].target.id][links[i].source.id] = links[i].weight.toString();
          M[links[i].source.id][links[i].target.id] = 1;
          M[links[i].target.id][links[i].source.id] = 1;
        }
      }
    } else {
      if (UNWEIGHTED === true) {
        for (var i = 0; i < links.length; i++) {
          adjMat[links[i].source.id][links[i].target.id] = "1";
          M[links[i].source.id][links[i].target.id] = 1;
        }
      } else {
        for (var i = 0; i < links.length; i++) {
          adjMat[links[i].source.id][links[i].target.id] = links[i].weight.toString();
          M[links[i].source.id][links[i].target.id] = 1;
        }
      }
    }

    // output adjMat to html
    d3.select("#adj_matrix_table").selectAll('tr').remove();
    var table1 = d3.select("#adj_matrix_table").select('tbody');

    // top
    var row = table1.append('tr');
    row.append('td').text(" ");

    for (var i = 0; i < maxNodeId; i++) row.append('td').text(i.toString()).attr('class', 'bold');

    for (var i = 0; i < maxNodeId; i++) {
      row = table1.append('tr');
      row.append('td').text(i.toString()).attr('class', 'bold');
      for (var j = 0; j < maxNodeId; j++) {
        if (adjMat[i][j] == "0") row.append('td').text(adjMat[i][j]).attr('class', 'red');
        else row.append('td').text(adjMat[i][j]);
      }
    }

    // output adjList to html
    d3.select("#adj_list_table").selectAll('tr').remove();
    var table2 = d3.select("#adj_list_table").select('tbody');

    for (var i = 0; i < maxNodeId; i++) {
      row = table2.append('tr');
      row.append('td').text(i.toString() + ": ").attr('class', 'bold');
      //for (var j = 0; j < adjList[i].length; j++) row.append('td').text(adjList[i][j]);
      if (UNWEIGHTED === true) {
        for (var j = 0; j < maxNodeId; j++)
          if (adjMat[i][j] == "1")
            row.append('td').text(j);
      } else {
        for (var j = 0; j < maxNodeId; j++)
          if ((adjMat[i][j] != "0") && (adjMat[i][j] != "x"))
            row.append('td').text("(" + j + ", " + adjMat[i][j] + ")");
      }
    }

    // output edgeList to html
    d3.select("#edge_list_table").selectAll('tr').remove();
    var table3 = d3.select("#edge_list_table").select('tbody');

    var counter = 0;
    for (var i = 0; i < maxNodeId; i++) {
      var start_j = 0;
      if (UNDIRECTED === true) start_j = i + 1; // to avoid bidirectional edges listed twice
      for (var j = start_j; j < maxNodeId; j++)
        if ((adjMat[i][j] != "0") && (adjMat[i][j] != "x")) {
          row = table3.append('tr');
          row.append('td').text(counter.toString() + ": ").attr('class', 'bold');
          counter++;
          row.append('td').text(i);
          row.append('td').text(j);
          if (UNWEIGHTED === false)
            row.append('td').text(adjMat[i][j]);
        }
    }

    var visited = new Array(10, false);

    function dfs(u) {
      visited[u] = true;
      for (var k = 0; k < nodes.length; k++)
        if ((adjMat[u][k] != "0") && (adjMat[u][k] != "x") && (visited[k] === false))
          dfs(k);
    }

    // #V and #E
    $("#VandE").text("V=" + countNode + ", E=" + countEdge);

    // IsTree
    if (UNDIRECTED === true) {
      var IsTree = (countEdge === countNode - 1); // first condition
      visited = new Array(10, false);
      for (var i = 0; i < nodes.length; i++) visited[i] = false;
      dfs(0);
      for (var i = 0; i < nodes.length; i++)
        if (visited[i] === false) {
          IsTree = false; // second condition
          break;
        }
      $("#isTree").text(IsTree ? "Yes" : "No");
    } else
      $("#isTree").text("N/A");

    // IsComplete
    if (UNDIRECTED === true)
      $("#isComplete").text((countEdge === (countNode * (countNode - 1)) / 2) ? "Yes" : "No");
    else // twice as many compared to undirected version
      $("#isComplete").text((countEdge === countNode * (countNode - 1)) ? "Yes" : "No");

    // IsBipartite
    if (UNDIRECTED === true) {
      var color = [];
      for (var i = 0; i < maxNodeId; i++) color[i] = -1;

      var IsBipartite = true;
      if (countNode === 0)
        IsBipartite = false;
      else {
        var q = [];
        q.push(nodes[0].id);
        while (q.length > 0) {
          var u = q.shift();
          for (var v = 0; v < maxNodeId; v++)
            if ((adjMat[u][v] != "0") && (adjMat[u][v] != "x")) {
              if (color[v] === -1) {
                color[v] = 1 - color[u];
                q.push(v);
              } else if (color[v] === color[u]) {
                IsBipartite = false;
                break;
              }
            }

          if (IsBipartite === false) break;
        }
      }
      $("#isBipartite").text(IsBipartite === true ? "Yes" : "No");
    } else
      $("#isBipartite").text("N/A");

    // IsDAG
    var IsDAG = true;
    if (UNDIRECTED === true)
      IsDAG = false;
    else {
      for (var k = 0; k < nodes.length; k++)
        for (var i = 0; i < nodes.length; i++)
          for (var j = 0; j < nodes.length; j++)
            if ((M[i][k] == 1) && (M[k][j] == 1))
              M[i][j] = 1;

      for (var i = 0; i < nodes.length; i++)
        if (M[i][i] == 1)
          IsDAG = false; // i can go out and come back to i... cycle
    }
    $("#isDAG").text(IsDAG === true ? "Yes" : "No");

    //isCross -md marker
    let isCross = false;
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      let lineA = {
        a: {
          x: link.source.x,
          y: link.source.y
        },
        b: {
          x: link.target.x,
          y: link.target.y
        }
      };
      for (let k = 0; k < links.length; k++) {
        if (k === i) {
          continue;
        }
        let anotherLink = links[k];
        let lineB = {
          a: {
            x: anotherLink.source.x,
            y: anotherLink.source.y
          },
          b: {
            x: anotherLink.target.x,
            y: anotherLink.target.y
          }
        };
        isCross = isIntersect(lineA, lineB);
        if (isCross) {
          // console.log("found cross");
          break;
        }
      }
      if (isCross) {
        break;
      }
    }
    // console.log(`is cross ${isCross}`);
    // console.log(`test is intersect ${isIntersect({a:{x:0,y:0},b:{x:10,y:10}},{a:{x:0,y:10},b:{x:10,y:0}})}`);
    // console.log(`test is intersect ${isIntersect({a:{x:0,y:0},b:{x:10,y:10}},{a:{x:0,y:0},b:{x:0,y:10}})}`);

    $('#isCross').text(isCross ? "Yes" : "No");
  }

  function isIntersect(lineA, lineB) {
    return (((lineB.a.x - lineA.a.x) * (lineA.b.y - lineA.a.y) - (lineB.a.y - lineA.a.y) * (lineA.b.x - lineA.a
        .x)) * ((lineB.b.x - lineA.a.x) * (lineA.b.y - lineA.a.y) - (lineB.b.y - lineA.a.y) * (lineA.b.x - lineA.a
        .x)) < 0 &&
      ((lineA.a.x - lineB.a.x) * (lineB.b.y - lineB.a.y) - (lineA.a.y - lineB.a.y) * (lineB.b.x - lineB.a.x)) * ((
        lineA.b.x - lineB.a.x) * (lineB.b.y - lineB.a.y) - (lineA.b.y - lineB.a.y) * (lineB.b.x - lineB.a.x)) < 0);
  }

  function arrowXY(x1, y1, x2, y2, t) {
    var dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    if (x1 === x2) {
      if (t === 1) return {
        x: x2 - 4,
        y: y2
      };
      else return {
        x: x2 + 4,
        y: y2
      };
    }

    if (y1 === y2) {
      if (t === 1) return {
        x: x2,
        y: y2 - 4
      };
      else return {
        x: x2,
        y: y2 + 4
      };
    }

    var m1 = (y2 - y1) / (x2 - x1);
    var c1 = y1 - m1 * x1;
    var m2 = -1 / m1;
    var c2 = y2 - m2 * x2;
    var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    var v = 4;
    d = d * d + v * v;
    var D = d;
    var z1 = c2 - y1;

    var a = 1 + m2 * m2;
    var b = 2 * m2 * z1 - 2 * x1;
    var c = x1 * x1 + z1 * z1 - D;

    var delta = b * b - 4 * a * c;

    delta = Math.sqrt(delta);

    var x_1 = (-b + delta) / (2 * a);
    var y_1 = m2 * x_1 + c2;

    var x_2 = (-b - delta) / (2 * a);
    var y_2 = m2 * x_2 + c2;

    if (t === 2) return {
      x: x_1,
      y: y_1
    };
    else return {
      x: x_2,
      y: y_2
    };
  }

  function weightXY(x1, y1, x2, y2, t, curve) {
    var dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    var x2 = (x1 + x2) / 2;
    var y2 = (y1 + y2) / 2;

    if (x1 === x2) {
      if (t === 2) return {
        x: x2 + 16,
        y: y2
      };
      else return {
        x: x2 - 16,
        y: y2
      };
    }

    if (y1 === y2) {
      if (t === 2) return {
        x: x2,
        y: y2 + 16
      };
      else return {
        x: x2,
        y: y2 - 16
      };
    }

    var m1 = (y2 - y1) / (x2 - x1);
    var c1 = y1 - m1 * x1;
    var m2 = -1 / m1;
    var c2 = y2 - m2 * x2;
    var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    var v = 16;
    if (curve === 1) v = 50;
    if (curve === 2) v = 18;

    d = d * d + v * v;
    var D = d;
    var z1 = c2 - y1;

    var a = 1 + m2 * m2;
    var b = 2 * m2 * z1 - 2 * x1;
    var c = x1 * x1 + z1 * z1 - D;

    var delta = b * b - 4 * a * c;

    delta = Math.sqrt(delta);

    var x_1 = (-b + delta) / (2 * a);
    var y_1 = m2 * x_1 + c2;

    var x_2 = (-b - delta) / (2 * a);
    var y_2 = m2 * x_2 + c2;

    if (t === 2) return {
      x: x_1,
      y: y_1
    };
    else return {
      x: x_2,
      y: y_2
    };
  }

  function mousedown() {
    svg.classed('active', true);
    if (d3.event.ctrlKey || mousedown_node || mousedown_link) return;

    // insert new node at point
    if (nodes.length === 10) {
      restart();
      svg
        .append('svg:g')
        .append('svg:text')
        .attr('x', 10)
        .attr('y', 20)
        .text('Không thể có hơn 10 đỉnh...');
      return;
    }

    var point = d3.mouse(this),
      node = {
        id: lastNodeId
      };

    // find new last node ID
    countNodeId[lastNodeId]++;
    for (var i = 0; i < maxNumberVertex; i++)
      if (countNodeId[i] === 0) {
        lastNodeId = i;
        break;
      }
    node.x = point[0];
    node.y = point[1];

    node.x = parseInt(node.x) - parseInt(node.x) % grid;
    node.y = parseInt(node.y) - parseInt(node.y) % grid;

    nodes.push(node);
    restart();
  }

  function mousemove() {
    if (!mousedown_node) return;
    // update drag line
    drag_line.attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(
      this)[1]);
    restart();
  }

  function mouseup() {
    if (mousedown_node) drag_line.classed('hidden', true); // hide drag line
    // because :active only works in WebKit?
    svg.classed('active', false);
    // clear mouse event vars
    resetMouseVars();
  }

  function spliceLinksForNode(node) {
    var toSplice = links.filter(function (l) {
      return (l.source === node || l.target === node);
    });
    toSplice.map(function (l) {
      links.splice(links.indexOf(l), 1);
    });
  }

  var lastKeyDown = -1;

  var drag = d3
    .behavior
    .drag()
    .on("drag", function (d) {
      var dragTarget = d3.select(this).select('circle');
      var new_cx, new_cy;

      dragTarget
        .attr("cx", function () {
          new_cx = d3.mouse($("svg")[0])[0];
          return new_cx;
        })
        .attr("cy", function () {
          new_cy = d3.mouse($("svg")[0])[1];
          return new_cy;
        });

      d.x = new_cx;
      d.y = new_cy;

      d.x = parseInt(d.x) - parseInt(d.x) % grid;
      d.y = parseInt(d.y) - parseInt(d.y) % grid;

      restart();
    });

  function keydown() {
    // d3.event.preventDefault(); // no need to block this
    lastKeyDown = d3.event.keyCode;

    if (d3.event.keyCode === 17) { // ctrl
      circle.call(drag);
      svg.classed('ctrl', true);
    }

    if (!selected_node && !selected_link) return;

    switch (d3.event.keyCode) {
      case 46: // delete
        if (selected_node) {
          nodes.splice(nodes.indexOf(selected_node), 1);
          spliceLinksForNode(selected_node);
          countNodeId[selected_node.id] = 0;
          for (var i = 0; i < maxNumberVertex; i++)
            if (countNodeId[i] === 0) {
              lastNodeId = i;
              break;
            }
        } else if (selected_link)
          links.splice(links.indexOf(selected_link), 1);
        selected_link = null;
        selected_node = null;
        restart();
        break;
      case 13: // enter
        if (selected_link && UNWEIGHTED === false) {
          while (true) {
            var newWeight = prompt('Nhập trọng số: (&le; 99)');
            if (newWeight <= 99) break;
          }
          var idx = links.indexOf(selected_link);
          links[idx].weight = newWeight;
        }
        restart();
        break;
    }
  }

  function keyup() {
    lastKeyDown = -1;
    if (d3.event.keyCode === 17) { // ctrl
      circle
        .on('mousedown.drag', null)
        .on('touchstart.drag', null);
      svg
        .classed('ctrl', false);
    }
  }

  svg
    .on('mousedown', mousedown)
    .on('mousemove', mousemove)
    .on('mouseup', mouseup);
  d3.select(window)
    .on('keydown', keydown)
    .on('keyup', keyup);
  restart();
}

function showTextArea(callback) {
  //$("#textArea").toggle();
  $("#myTextarea").toggle();
  if (isPlaying) stop();
  if (mode == "exploration") {
    $("#dark-overlay").fadeIn(function () {
      $("#textArea").fadeIn();
    });
    isPlaying = false;
  }
}

function closeTextArea(callback) {
  $("#myTextarea").toggle();
  if (isPlaying) stop();
  if (mode == "exploration") {
    $("#dark-overlay").fadeOut(function () {
      $("#textArea").fadeOut("fast");
    });
    isPlaying = false;
  }
}

function DrawGraMatrix() {
  var a;
  Adja_Matrix = [];
  Adja_Matrix_E = [];
  //let emptySVG=document.getElementById("svgidd");
  //emptySVG.empty();
  $("#svgidd").empty();
  a = document.getElementById("myTextarea").value;
  //document.getElementById("demo").innerHTML = a;
  //line
  a = a.split('\n');
  for (i = 1; i <= a[0][0]; i++) {
    a[i] = a[i].split(" ");
  }
  udc = function (a) {
    for (i = 1; i <= a[0][0]; i++) {
      for (j = i - 1; j < a[0][0]; j++) {
        if (a[i][j] != a[j + 1][i - 1]) {
          return false;
        }
      }
    }
    return true;
  }
  uwc = function (a) {
    for (i = 1; i <= a[0][0]; i++) {
      for (j = 0; j < a[0][0]; j++) {
        if (a[i][j] > 1 || a[i][j] < 0) {
          return false;
        }
      }
    }
    return true;
  }
  UDC = udc(a);
  UWC = uwc(a);



  for (i = 0; i < a[0][0]; i++) {
    tep = {
      id: i,
      x: Math.floor(Math.random() * 630) + 10,
      y: Math.floor(Math.random() * 350) + 10
    }
    Adja_Matrix.push(tep);
  }
  if (UWC) {
    if (UDC) {
      for (i = 1; i <= a[0][0]; i++) {
        for (j = i - 1; j < a[0][0]; j++) {
          if (a[i][j] != 0 && j != i - 1) {
            temp = {
              source: {
                id: i - 1
              },
              target: {
                id: j
              }
            }
            Adja_Matrix_E.push(temp);
          }

        }
      }
    } else {
      for (i = 1; i <= a[0][0]; i++) {
        for (j = 0; j < a[0][0]; j++) {
          if (a[i][j] != 0 && j != i - 1) {
            temp = {
              source: {
                id: i - 1
              },
              target: {
                id: j
              }
            }
            Adja_Matrix_E.push(temp);
          }

        }
      }
    }

  } else {
    if (UDC) {
      for (i = 1; i <= a[0][0]; i++) {
        for (j = i - 1; j < a[0][0]; j++) {
          if (a[i][j] != 0 && j != i - 1) {
            temp = {
              source: {
                id: i - 1
              },
              target: {
                id: j
              },
              weight: a[i][j]
            }
            Adja_Matrix_E.push(temp);
          }

        }
      }
    } else {
      for (i = 1; i <= a[0][0]; i++) {
        for (j = 0; j < a[0][0]; j++) {
          if (a[i][j] != 0 && j != i - 1) {
            temp = {
              source: {
                id: i - 1
              },
              target: {
                id: j
              },
              weight: a[i][j]
            }
            Adja_Matrix_E.push(temp);
          }

        }
      }
    }

  }


  GraphVisu(UDC, UWC, 'MaIN');
}