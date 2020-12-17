// Graph Traversal Widget
// original author: Koh Zi Chun, improved by Nguyen Viet Dung, then maintained by Steven Halim

var GraphTraversal = function () {
  var self = this;
  var gw = new GraphWidget();

  var iVL = {};
  var iEL = {};
  var amountVertex = 0;
  var amountEdge = 0;


  this.getGraphWidget = function () {
    return gw;
  };

  fixJSON = function () {
    amountVertex = 0;
    amountEdge = 0;
    for (var key in iVL) amountVertex++;
    for (var key in iEL) amountEdge++;

    // for (var key in iEL) {
    //   delete iEL[key]["type"];
    //   delete iEL[key]["displayWeight"];
    // }
    // for (var key in iVL) {
    //   iVL[key]["x"] = iVL[key]["cx"];
    //   delete iVL[key]["cx"];
    //   iVL[key]["y"] = iVL[key]["cy"];
    //   delete iVL[key]["cy"];
    //   delete iVL[key]["text"];
    //   delete iVL[key]["state"];
    // }
    // for (var key in iEL) {
    //   iEL[key]["u"] = +iEL[key]["vertexA"];
    //   delete iEL[key]["vertexA"];
    //   iEL[key]["v"] = +iEL[key]["vertexB"];
    //   delete iEL[key]["vertexB"];
    //   iEL[key]["w"] = +iEL[key]["weight"];
    //   delete iEL[key]["weight"];
    // }
  };

  takeJSON = function (graph) {
    if (graph == null) return;
    graph = JSON.parse(graph);
    iVL = graph["vl"];
    iEL = graph["el"];
    fixJSON();
  };

  statusChecking = function () {
    $("#draw-status p").html(
      "Draw graph with varying properties then try to run various graph traversal algorithms on it.<br>The default drawing mode is directed graph (each edge has one or at most two arrows)."
    );
  };

  warnChecking = function () {
    var warn = "";
    if (amountVertex >= 10)
      warn +=
      "Quá nhiều đỉnh trên màn hình, hãy vẽ đồ thị nhỏ hơn. ";
    if (warn == "") $("#draw-warn p").html("Không cảnh báo.");
    else $("#draw-warn p").html(warn);
  };

  errorChecking = function () {
    var error = "";
    if (amountVertex == 0) {
      $("#draw-err p").html("Đồ thị không thể để trống. ");
      return;
    }

    if (error == "") $("#draw-err p").html("Không có lỗi");
    else $("#draw-err p").html(error);
  };

  var intervalID;

  this.startLoop = function () {
    intervalID = setInterval(function () {
      takeJSON(JSONresult);
      warnChecking();
      errorChecking();
      statusChecking();
    }, 100);
  };

  this.stopLoop = function () {
    clearInterval(intervalID);
  };

  this.draw = function () {
    if ($("#draw-err p").html() != "Không có lỗi") return false;
    if ($("#submit").is(":checked")) this.submit(JSONresult);
    if ($("#copy").is(":checked"))
      window.prompt("Copy to clipboard:", JSONresult);

    DIRECTED_GR = true;
    OLD_POSITION = amountEdge;

    graph = createState(iVL, iEL);
    gw.updateGraph(graph, 500);
    return true;
  };

  // this.submit = function(graph) {
  //   $.ajax({
  //     url: PHP_DOMAIN + "php/Graph.php?mode=" + MODE_SUBMIT_GRAPH,
  //     type: "POST",
  //     data: {canvasWidth: 1000, canvasHeight: 500, graphTopics: 'Graph Traversal', graphState: graph, fbAccessToken: fbAccessToken},
  //     error: function(xhr, errorType, exception) { //Triggered if an error communicating with server
  //         var errorMessage = exception || xhr.statusText; //If exception null, then default to xhr.statusText
  //         alert("There was an error submitting your graph " + errorMessage);
  //     }
  //   }).done(function(data) {
  //     console.log(data);
  //   });
  // }

  this.importjson = function (text) {
    takeJSON(text);
    statusChecking();

    DIRECTED_GR = true;
    OLD_POSITION = amountEdge;

    graph = createState(iVL, iEL);
    gw.updateGraph(graph, 500);
  };

  this.initRandom = function (graph) {
    iVL = graph.iVL;
    iEL = graph.iEL;
    amountVertex = iVL.length;
    amountEdge = iEL.length;
    fixJSON();
    statusChecking();

    DIRECTED_GR = true;
    OLD_POSITION = amountEdge;

    var newState = createState(iVL, iEL);
    gw.updateGraph(newState, 500);
  };

  var DIRECTED_GR;
  var OLD_POSITION;

  this.directedChange = function () {
    for (var key in iVL) iVL[key]["extratext"] = "";
    if (DIRECTED_GR == true) {
      DIRECTED_GR = false;
      for (var i = 0; i < OLD_POSITION; i++) {
        var ok = false;
        for (var j = 0; j < amountEdge; j++)
          if (
            iEL[i]["u"] == iEL[j]["v"] &&
            iEL[i]["v"] == iEL[j]["u"]
          ) {
            ok = true;
            break;
          }
        if (ok == false)
          iEL[amountEdge++] = {
            u: iEL[i]["v"],
            v: iEL[i]["u"],
          };
      }
    } else {
      DIRECTED_GR = true;
      for (var i = OLD_POSITION; i < amountEdge; i++)
        delete iEL[i];
      amountEdge = OLD_POSITION;
    }

    var newState = createState(iVL, iEL);
    gw.updateGraph(newState, 500);
    // $('#directedChange-err').html("Successful")
    //   .delay(1000)
    //   .queue(function(n) {
    //     $(this).html("");
    //   });
    return true;
  };

  this.getGraph = function () {
    return {
      vl: iVL,
      el: iEL,
    };
  };

  this.getV = function () {
    return amountVertex;
  };

  this.dfs = function (sourceVertex, callback) {
    var vertexHighlighted = {},
      edgeHighlighted = {},
      vertexTraversed = {},
      vertexTraversing = {},
      treeEdge = {},
      backEdge = {},
      forwardEdge = {},
      crossEdge = {};
    var stateList = [];
    var cs;

    // error checks
    if (amountVertex == 0) {
      // no graph
      $("#dfs-err").html(
        "Không có đồ thị để chạy. Hãy chọn một đồ thị ví dụ trước."
      );
      return false;
    }

    if (sourceVertex >= amountVertex || sourceVertex < 0) {
      // source vertex not in range
      $("#dfs-err").html(
        "Đỉnh này không có trong đồ thị. Hãy chọn một đỉnh xuất phát khác"
      );
      return false;
    }

    var UNVISITED = 0,
      EXPLORED = 1,
      VISITED = 2;
    var p = {},
      num = {},
      Count = 0; // low = {},
    for (var i = 0; i < amountVertex; i++) {
      p[i] = -1;
      num[i] = UNVISITED;
    }
    p[sourceVertex] = -2;
    for (var key in iVL) iVL[key]["extratext"] = "";
    iVL[sourceVertex]["extratext"] = "source";

    function dfsRecur(u) {
      vertexHighlighted[u] = true;
      cs = createState(
        iVL,
        iEL,
        vertexHighlighted,
        edgeHighlighted,
        vertexTraversed,
        vertexTraversing,
        treeEdge,
        backEdge,
        crossEdge,
        forwardEdge
      );
      cs["status"] = "DFS(" + u + ")";
      cs["lineNo"] = 1;
      stateList.push(cs);

      delete vertexHighlighted[u];
      vertexTraversing[u] = true;
      num[u] = EXPLORED; // low[u] = ++Count;

      var neighbors = [];
      for (var j = 0; j < amountEdge; j++)
        if (iEL[j]["u"] == u) neighbors.push(j);
      neighbors.sort(function (a, b) {
        return iEL[a]["v"] - iEL[b]["v"];
      });

      while (neighbors.length > 0) {
        var j = neighbors.shift();
        var u = iEL[j]["u"],
          v = iEL[j]["v"];
        edgeHighlighted[j] = true;
        for (var key in iEL)
          if (iEL[key]["u"] == v && iEL[key]["v"] == u)
            edgeHighlighted[key] = true;
        cs = createState(
          iVL,
          iEL,
          vertexHighlighted,
          edgeHighlighted,
          vertexTraversed,
          vertexTraversing,
          treeEdge,
          backEdge,
          crossEdge,
          forwardEdge
        );
        cs["status"] = "Thử cạnh {u} → {v}"
          .replace("{u}", u)
          .replace("{v}", v);
        cs["lineNo"] = 2;
        cs["el"][j]["animateHighlighted"] = true;
        stateList.push(cs);

        for (var key in iVL) delete vertexHighlighted[key];
        for (var key in iEL) delete edgeHighlighted[key];

        if (num[v] == UNVISITED) {
          vertexTraversing[v] = true;
          treeEdge[j] = true;
          for (var key in iEL)
            if (
              iEL[key]["u"] == v &&
              iEL[key]["v"] == u
            )
              treeEdge[key] = true;
          cs = createState(
            iVL,
            iEL,
            vertexHighlighted,
            edgeHighlighted,
            vertexTraversed,
            vertexTraversing,
            treeEdge,
            backEdge,
            crossEdge,
            forwardEdge
          );
          cs["lineNo"] = [3];
          cs[
              "status"
            ] =
            'Thử cạnh {u} → {v}<br>Dỉnh {v} chưa được ghé thăm, chúng ta có <font color="red">tree edge</font>.'
            .replace("{u}", u)
            .replace("{v}", v)
            .replace("{v}", v);
          stateList.push(cs);

          p[v] = u;
          dfsRecur(v);

          vertexHighlighted[u] = true;
          delete vertexHighlighted[v];
          cs = createState(
            iVL,
            iEL,
            vertexHighlighted,
            edgeHighlighted,
            vertexTraversed,
            vertexTraversing,
            treeEdge,
            backEdge,
            crossEdge,
            forwardEdge
          );
          cs[
              "status"
            ] = "Kết thúc DFS({v}), quay lui DFS({u})."
            .replace("{u}", u)
            .replace("{v}", v);
          cs["lineNo"] = 1;
          stateList.push(cs);
        } else if (num[v] == EXPLORED) {
          if (p[u] != v) {
            backEdge[j] = true;
            for (var key in iEL)
              if (
                iEL[key]["u"] == v &&
                iEL[key]["v"] == u
              )
                backEdge[key] = true;
          }
          cs = createState(
            iVL,
            iEL,
            vertexHighlighted,
            edgeHighlighted,
            vertexTraversed,
            vertexTraversing,
            treeEdge,
            backEdge,
            crossEdge,
            forwardEdge
          );
          var thisStatus = "Thử cạnh {u} → {v}<br>Đỉnh {v} đã tới, chứng ta có một "
            .replace("{u}", u)
            .replace("{v}", v)
            .replace("{v}", v);
          if (p[u] == v)
            thisStatus =
            thisStatus +
            '<font color="blue">cạnh hai chiều</font> (a trivial cycle).';
          else
            thisStatus =
            thisStatus +
            '<font color="blue">trở lại cạnh</font> (a true cycle).';
          cs["status"] = thisStatus;
          cs["lineNo"] = 4;
          stateList.push(cs);
        } else if (num[v] == VISITED) {
          forwardEdge[j] = true;
          for (var key in iEL)
            if (
              iEL[key]["u"] == v &&
              iEL[key]["v"] == u
            )
              forwardEdge[key] = true;
          cs = createState(
            iVL,
            iEL,
            vertexHighlighted,
            edgeHighlighted,
            vertexTraversed,
            vertexTraversing,
            treeEdge,
            backEdge,
            crossEdge,
            forwardEdge
          );
          cs[
              "status"
            ] =
            'Thử cạnh {u} → {v}<br>Đỉnh {v} đã tới, chúng ta có một <font color="grey">forward/cross edge</font>.'
            .replace("{u}", u)
            .replace("{v}", v)
            .replace("{v}", v);
          cs["lineNo"] = 5;
          stateList.push(cs);
        }
      }
      num[u] = VISITED;
      vertexTraversed[u] = true;
      delete vertexTraversing[u];
    }
    dfsRecur(sourceVertex);

    cs = createState(
      iVL,
      iEL,
      vertexHighlighted,
      edgeHighlighted,
      vertexTraversed,
      vertexTraversing,
      treeEdge,
      backEdge,
      crossEdge,
      forwardEdge
    );
    cs[
        "status"
      ] =
      'DFS({sourceVertex}) đã hoàn thành. Cạnh <font color="red">đỏ</font>/<font color="grey">xám</font>/<font color="blue">xanh</font> là <font color="red">tree</font>/<font color="grey">cross/forward</font>/<font color="blue">back</font> edge của cây khung DFS, tương ứng.'
      .replace(
        "{sourceVertex}",
        sourceVertex
      );
    cs["lineNo"] = 0;
    stateList.push(cs);

    populatePseudocode(0);
    gw.startAnimation(stateList, callback);
    return true;
  };

  this.bfs = function (sourceVertex, callback) {
    var notVisited = {},
      vertexHighlighted = {},
      edgeHighlighted = {},
      vertexTraversed = {},
      vertexTraversing = {},
      treeEdge = {},
      backEdge = {},
      forwardEdge = {},
      crossEdge = {};
    var stateList = [];
    var key, i, cs;

    // error checks
    if (amountVertex == 0) {
      // no graph
      $("#bfs-err").html(
        "Không có đồ thị để chạy. Hãy chọn một đồ thị ví dụ trước."
      );
      return false;
    }

    if (sourceVertex >= amountVertex || sourceVertex < 0) {
      // source vertex not in range
      $("#bfs-err").html(
        "Đỉnh này không có trong đồ thị. Hãy chọn một đỉnh xuất phát khác"
      );
      return false;
    }

    var p = {},
      d = {};
    for (var i = 0; i < amountVertex; i++) {
      p[i] = -1;
      d[i] = 999;
    }
    d[sourceVertex] = 0;
    for (var key in iVL) iVL[key]["extratext"] = "";
    iVL[sourceVertex]["extratext"] = "source";

    var q = []; //, EdgeProcessed = 0;
    q.push(sourceVertex);
    p[sourceVertex] = -2;
    vertexHighlighted[sourceVertex] = true;
    cs = createState(
      iVL,
      iEL,
      vertexHighlighted,
      edgeHighlighted,
      vertexTraversed,
      vertexTraversing,
      treeEdge,
      backEdge,
      crossEdge,
      forwardEdge
    );
    cs[
        "status"
      ] = "Bắt đầu từ đỉnh s = {sourceVertex}.<br>Thiết lập Q = {{sourceVertex}}."
      .replace("{sourceVertex}", sourceVertex)
      .replace("{sourceVertex}", sourceVertex); // d[" + sourceVertex + "] = 0,
    cs["lineNo"] = 1;
    stateList.push(cs);
    delete vertexHighlighted[sourceVertex];

    while (q.length > 0) {
      delete vertexTraversing[q[0]];
      vertexHighlighted[q[0]] = true;
      cs = createState(
        iVL,
        iEL,
        vertexHighlighted,
        edgeHighlighted,
        vertexTraversed,
        vertexTraversing,
        treeEdge,
        backEdge,
        crossEdge,
        forwardEdge
      );
      cs[
          "status"
        ] = "Hàng đợi hiện tại {{queue}}.<br>Duyệt đỉnh kề u = {Lis}."
        .replace("{queue}", q)
        .replace("{Lis}", q[0]);
      cs["lineNo"] = [2, 3];
      stateList.push(cs);

      var f = q.shift();
      vertexTraversed[f] = true;

      var neighbors = [];
      for (var j = 0; j < amountEdge; j++)
        if (iEL[j]["u"] == f) neighbors.push(j);
      neighbors.sort(function (a, b) {
        return iEL[a]["v"] - iEL[b]["v"];
      });

      while (neighbors.length > 0) {
        var j = neighbors.shift();
        var u = iEL[j]["u"],
          v = iEL[j]["v"];
        for (var key in iVL) delete vertexHighlighted[key];
        for (var key in iEL) delete edgeHighlighted[key];
        if (u == f) {
          // outgoing edge from vertex u
          //EdgeProcessed++;
          //var thisStatus = 'relax(' + u + ', ' + v + ', 1), #edge_processed = ' + EdgeProcessed + '.';
          edgeHighlighted[j] = true;
          for (var key in iEL)
            if (
              iEL[key]["u"] == v &&
              iEL[key]["v"] == u
            )
              edgeHighlighted[key] = true;
          cs = createState(
            iVL,
            iEL,
            vertexHighlighted,
            edgeHighlighted,
            vertexTraversed,
            vertexTraversing,
            treeEdge,
            backEdge,
            crossEdge,
            forwardEdge
          );
          cs["status"] = "Thử cạnh {u} → {v}"
            .replace("{u}", u)
            .replace("{v}", v)
            .replace("{v}", v);
          cs["lineNo"] = 3;
          cs["el"][j]["animateHighlighted"] = true;
          stateList.push(cs);

          if (d[v] == 999) {
            d[v] = d[u] + 1;
            p[v] = u;
            treeEdge[j] = true;
            for (var key in iEL)
              if (
                iEL[key]["u"] == v &&
                iEL[key]["v"] == u
              )
                treeEdge[key] = true;
            q.push(v);
            vertexTraversing[v] = true;
            iVL[v]["extratext"] = d[v];
            cs = createState(
              iVL,
              iEL,
              vertexHighlighted,
              edgeHighlighted,
              vertexTraversed,
              vertexTraversing,
              treeEdge,
              backEdge,
              crossEdge,
              forwardEdge
            );
            cs[
                "status"
              ] = 'Try edge {u} → {v}<br>Đỉnh {v} chưa tới, chúng ta có <font color="red">tree edge</font>.'
              .replace("{u}", u)
              .replace("{v}", v)
              .replace("{v}", v);
            cs["lineNo"] = 4;
          } else {
            var grey_it = true;
            for (var key in iEL)
              if (
                iEL[key]["u"] == v &&
                iEL[key]["v"] == u &&
                treeEdge[key]
              )
                grey_it = false;
            if (grey_it) {
              forwardEdge[j] = true; // use grey to signify non-tree edge
              for (var key in iEL)
                if (
                  iEL[key]["u"] == v &&
                  iEL[key]["v"] == u
                )
                  forwardEdge[key] = true;
            }
            cs = createState(
              iVL,
              iEL,
              vertexHighlighted,
              edgeHighlighted,
              vertexTraversed,
              vertexTraversing,
              treeEdge,
              backEdge,
              crossEdge,
              forwardEdge
            );
            cs[
                "status"
              ] =
              'Thử cạnh {u} → {v}<br>Đỉnh {v} đã được ghé thăm, chúng ta bỏ <font color="grey">non-tree edge</font> này.'
              .replace("{u}", u)
              .replace("{v}", v)
              .replace("{v}", v);
            cs["lineNo"] = 5;
          }
          stateList.push(cs);
        }
      }
      delete vertexHighlighted[u];
    }

    for (var key in iVL) delete vertexHighlighted[key];
    for (var key in iEL) delete edgeHighlighted[key];
    vertexHighlighted[sourceVertex] = true;
    cs = createState(
      iVL,
      iEL,
      vertexHighlighted,
      edgeHighlighted,
      vertexTraversed,
      vertexTraversing,
      treeEdge,
      backEdge,
      crossEdge,
      forwardEdge
    );
    cs[
        "status"
      ] =
      'BFS({sourceVertex}) đã hoàn thành. Cạnh <font color="red">đỏ</font>/<font color="grey">xám</font> là <font color="red">tree</font>/<font color="grey">non-tree</font> edge của cây khung BFS và SSSP (for unweighted graph).'
      .replace(
        "{sourceVertex}",
        sourceVertex
      );
    stateList.push(cs);

    populatePseudocode(1);
    gw.startAnimation(stateList, callback);
    return true;
  };

  this.examples = function (id) {
    iVL = getExampleGraph(id, VL);
    iEL = getExampleGraph(id, EL);
    amountVertex = 0;
    amountEdge = 0;
    for (var key in iVL) amountVertex++;
    for (var key in iEL) amountEdge++;

    DIRECTED_GR = true;
    OLD_POSITION = amountEdge;

    var newState = createState(iVL, iEL);
    gw.updateGraph(newState, 500);
    return true;
  };

  this.loadGraph = function (vertexList, edgeList) {
    iVL = vertexList;
    iEL = edgeList;
    fixJSON();
    var newState = createState(iVL, iEL);
    gw.updateGraph(newState, 500);
  };

  function createState(
    iVLObject,
    iELObject,
    vertexHighlighted,
    edgeHighlighted,
    vertexTraversed,
    vertexTraversing,
    treeEdge,
    backEdge,
    crossEdge,
    forwardEdge,
    hiddenEdge
  ) {
    if (vertexHighlighted == null) vertexHighlighted = {};
    if (edgeHighlighted == null) edgeHighlighted = {};
    if (vertexTraversed == null) vertexTraversed = {};
    if (vertexTraversing == null) vertexTraversing = {};
    if (treeEdge == null) treeEdge = {};
    if (backEdge == null) backEdge = {};
    if (crossEdge == null) crossEdge = {};
    if (forwardEdge == null) forwardEdge = {};
    if (hiddenEdge == null) hiddenEdge = {};

    var key,
      state = {
        vl: {},
        el: {},
      };

    for (key in iVLObject) {
      state["vl"][key] = {};
      state["vl"][key]["cx"] = iVLObject[key]["x"];
      state["vl"][key]["cy"] = iVLObject[key]["y"];
      state["vl"][key]["text"] = key;
      state["vl"][key]["extratext"] =
        iVLObject[key]["extratext"];
      if (iVLObject[key]["state"] == OBJ_HIDDEN)
        state["vl"][key]["state"] = OBJ_HIDDEN;
      else state["vl"][key]["state"] = VERTEX_DEFAULT;
    }

    for (key in iELObject) {
      state["el"][key] = {};
      state["el"][key]["vertexA"] = iELObject[key]["u"];
      state["el"][key]["vertexB"] = iELObject[key]["v"];
      if (DIRECTED_GR == false)
        state["el"][key]["type"] = EDGE_TYPE_UDE;
      else state["el"][key]["type"] = EDGE_TYPE_DE;
      state["el"][key]["weight"] = iELObject[key]["w"];
      if (iELObject[key]["state"] == OBJ_HIDDEN)
        state["el"][key]["state"] = OBJ_HIDDEN;
      else state["el"][key]["state"] = EDGE_DEFAULT;
      state["el"][key]["displayWeight"] = false;
      state["el"][key]["animateHighlighted"] = false;
    }

    for (key in vertexTraversed)
      state["vl"][key]["state"] = VERTEX_TRAVERSED;
    for (key in vertexTraversing)
      state["vl"][key]["state"] = VERTEX_BLUE_OUTLINE;
    for (key in treeEdge) state["el"][key]["state"] = EDGE_RED;
    for (key in backEdge) state["el"][key]["state"] = EDGE_BLUE;
    for (key in crossEdge)
      state["el"][key]["state"] = EDGE_GREEN;
    for (key in forwardEdge)
      state["el"][key]["state"] = EDGE_GREY;

    for (key in vertexHighlighted)
      state["vl"][key]["state"] = VERTEX_HIGHLIGHTED;
    for (key in edgeHighlighted) {
      state["el"][key]["state"] = EDGE_HIGHLIGHTED;
      for (var keyR in iEL)
        if (
          iEL[key]["u"] == iEL[keyR]["v"] &&
          iEL[key]["v"] == iEL[keyR]["u"]
        )
          edgeHighlighted[keyR] = true;
    }

    for (key in hiddenEdge)
      state["el"][key]["state"] = EDGE_GREY;

    return state;
  }

  function populatePseudocode(act) {
    switch (act) {
      case 0: // DFS
        $("#code1").html("DFS(u)");
        $("#code2").html("for each neighbor v of u");
        $("#code3").html(
          "&nbsp;&nbsp;if v is unvisited, tree edge, DFS(v)"
        );
        $("#code4").html(
          "&nbsp;&nbsp;else if v is explored, bidirectional/back edge"
        );
        $("#code5").html(
          "&nbsp;&nbsp;else if v is visited, forward/cross edge"
        );
        $("#code6").html(
          '// <b><a href="http://cpbook.net/#downloads" target="_blank">ch4_01_dfs.cpp/java, ch4, CP3</a></b>'
        );
        $("#code7").html("");
        break;
      case 1: // BFS
        $("#code1").html("BFS(u), Q = {u}");
        $("#code2").html(
          "while !Q.empty // Q is a normal queue"
        );
        $("#code3").html(
          "&nbsp;&nbsp;for each neighbor v of u = Q.front, Q.pop"
        );
        $("#code4").html(
          "&nbsp;&nbsp;&nbsp;&nbsp;if v is unvisited, tree edge, Q.push(v)"
        );
        $("#code5").html(
          "&nbsp;&nbsp;&nbsp;&nbsp;else if v is visited, we ignore this edge"
        ); // bidirectional/back edge
        $("#code6").html(
          '// <b><a href="http://cpbook.net/#downloads" target="_blank">ch4_04_bfs.cpp/java, ch4, CP3</a></b>'
        );
        $("#code7").html("");
        break;
    }
  }
};

// Graph Traversal action
var actionsWidth = 150;
var statusCodetraceWidth = 410;
var isExamplesOpen = false,
  isBFSOpen = false,
  isDFSOpen = false;

function openExamples() {
  if (!isExamplesOpen) {
    $(".examples").fadeIn("fast");
    isExamplesOpen = true;
  }
}

function closeExamples() {
  if (isExamplesOpen) {
    $(".examples").fadeOut("fast");
    isExamplesOpen = false;
  }
}

function openDFS() {
  if (!isDFSOpen) {
    $(".dfs").fadeIn("fast");
    isDFSOpen = true;
  }
}

function closeDFS() {
  if (isDFSOpen) {
    $(".dfs").fadeOut("fast");
    $("#dfs-err").html("");
    isDFSOpen = false;
  }
}

function openBFS() {
  if (!isBFSOpen) {
    $(".bfs").fadeIn("fast");
    isBFSOpen = true;
  }
}

function closeBFS() {
  if (isBFSOpen) {
    $(".bfs").fadeOut("fast");
    $("#bfs-err").html("");
    isBFSOpen = false;
  }
}

function hideEntireActionsPanel() {
  closeExamples();
  closeDFS();
  closeBFS();
  hideActionsPanel();
}

// local
write(false, true);
var gtw, gw, randomGraphID;

$(function () {
  $("#play").hide();
  gtw = new GraphTraversal();
  gw = gtw.getGraphWidget();
  var options = [
    CP3_4_1,
    CP3_4_3,
    CP3_4_4,
    CP3_4_9,
    CP3_4_17,
    CP3_4_18,
    CP3_4_19,
  ];
  //var options=[CP3_4_1];
  gtw.examples(options[Math.floor(Math.random() * 7)]);
  randomGraphID = -1;
  var graphJSON = getQueryVariable("create");
  if (graphJSON.length > 0) {
    importjson(graphJSON);
    window.history.pushState(
      "object or string",
      "Title",
      window.location.href.split("?")[0]
    );
  }
  // var directed = getQueryVariable("directed");
  // if (directed.length > 0) {
  //   directed = parseInt(directed);
  //   if (directed === 0)
  //     directedChange();
  // }



  $("#examples").click(function () {
    openExamples();
    closeDFS();
    closeBFS();
  });

  $("#directedChange").click(function () {
    closeExamples();
    closeDFS();
    closeBFS();
  });

  $("#dfs").click(function () {
    closeExamples();
    openDFS();
    closeBFS();
  });

  $("#bfs").click(function () {
    closeExamples();
    closeDFS();
    openBFS();
  });
});

function importjson(text) {
  if (isPlaying) stop();
  if (mode == "exploration") {
    gtw.importjson(text);
    closeExamples();
    isPlaying = false;
  }
}

function drawGraph() {
  if (isPlaying) stop();
  if (mode == "exploration") {
    $("#dark-overlay").fadeIn(function () {
      $("#drawgraph").fadeIn();
    });
    gtw.startLoop();
    isPlaying = false;
  }
}

function drawDone() {
  if (!gtw.draw()) return false;
  gtw.stopLoop();
  $("#drawgraph").fadeOut();
  $("#dark-overlay").fadeOut();
}

function drawCancel() {
  gtw.stopLoop();
  $("#drawgraph").fadeOut();
  $("#dark-overlay").fadeOut();
}

function createRandom() {
  if (isPlaying) stop();
  if (mode == "exploration") {
    var n = Math.floor(Math.random() * 6 + 5);
    data = JSON.parse(data);
    var graph = extractQnGraph(data.graph);
    if (data.graphID == randomGraphID)
      // to ensure we get different graph per click (make sure #graph > 1 in the database)
      createRandom();
    randomGraphID = data.graphID;
    gtw.initRandom(graph);
    $("#rate-sample-graph").show();
    $("#progress-bar").slider("option", "max", 0);
    closeExamples();
    isPlaying = false;
  }
}

function example(id) {
  if (isPlaying) stop();
  setTimeout(function () {
    if (gtw.examples(id)) {
      // (mode == "exploration") &&
      $("#progress-bar").slider("option", "max", 0);
      closeExamples();
      isPlaying = false;
    }
  }, 500);
}

function directedChange() {
  if (isPlaying) stop();
  setTimeout(function () {
    if (mode == "exploration" && gtw.directedChange()) {
      $("#progress-bar").slider("option", "max", 0);
      isPlaying = false;
    }
  }, 500);
}

function dfs(callback) {
  if (isPlaying) stop();
  var input = parseInt($("#dfs-v").val());
  commonAction(gtw.dfs(input, callback), "DFS(" + input + ")");
  setTimeout(function () {
    $("#dfs-v").val(1 + Math.floor(Math.random() * gtw.getV()));
  }, 500); // randomized for next click between [0..V-1]
}

function bfs(callback) {
  if (isPlaying) stop();
  var input = parseInt($("#bfs-v").val());
  commonAction(gtw.bfs(input, callback), "BFS(" + input + ")");
  setTimeout(function () {
    $("#bfs-v").val(1 + Math.floor(Math.random() * gtw.getV()));
  }, 500);
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

function showUploadFile(callback) {
  //$("#textArea").toggle();
  $("#uploader").toggle();
  if (isPlaying) stop();
  if (mode == "exploration") {
    $("#dark-overlay").fadeIn(function () {
      $("#uploadFile").fadeIn();
    });
    isPlaying = false;
  }
}

function closeUploadFile(callback) {
  $("#uploader").toggle();
  if (isPlaying) stop();
  if (mode == "exploration") {
    $("#dark-overlay").fadeOut(function () {
      $("#uploadFile").fadeOut("fast");
    });
    isPlaying = false;
  }
}

function loadGraph(graph) {
  if (gtw) {
    gtw.loadGraph(graph["vl"], graph["el"]);
  }
}

// Implement these functions in each visualisation
var userGraph = {
  vl: {},
  el: {},
};

// This function will be called before returning to Explore Mode
function ENTER_EXPLORE_MODE() {
  loadGraph(userGraph);
}

// function uploadFile() {
//   var x = document.getElementById("uploader");
//   var txt = "";
//   if ('files' in x) {
//     if (x.files.length == 0) {
//       txt = "Select one or more files.";
//     } else {
//       for (var i = 0; i < x.files.length; i++) {
//         txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
//         var file = x.files[i];
//         if ('name' in file) {
//           txt += "name: " + file.name + "<br>";
//         }
//         if ('size' in file) {
//           txt += "size: " + file.size + " bytes <br>";
//         }
//       }
//     }
//   } else {
//     if (x.value == "") {
//       txt += "Select one or more files.";
//     } else {
//       txt += "The files property is not supported by your browser!";
//       txt += "<br>The path of the selected file: " + x
//       .value; // If the browser does not support the files property, it will return the path of the selected file instead. 
//     }
//   }
//   document.getElementById("demo").innerHTML = txt;
// }

function loadFileAsText() {
  var fileToLoad = document.getElementById("uploader").files[0];

  var fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    document.getElementById("myTextarea").value = textFromFileLoaded;
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
  closeUploadFile();
  example(matrixx);
}

// Lecture action functions