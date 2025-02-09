// SSSP Widget
// author: Steven Halim

var SSSP = function () {
  var self = this;
  var gw = new GraphWidget();

  var iVL = {};
  var iEL = {};
  var amountVertex = 0;
  var amountEdge = 0;

  this.getgw = function () {
    return gw;
  }

  fixJSON = function () {
    amountVertex = 0;
    amountEdge = 0;
    for (var key in iVL) amountVertex++;
    for (var key in iEL) amountEdge++;

    for (var key in iEL) iEL[key]["w"] = parseInt(iEL[key]["w"]); // integer
  }

  takeJSON = function (graph) {
    if (graph == null) return;
    graph = JSON.parse(graph);
    iVL = graph["vl"];
    iEL = graph["el"];
    fixJSON();
  }

  statusChecking = function () {
    $("#draw-status p").html(
      'Please draw a <b>directed weighted graph</b> where <b>vertex 0 is the source</b>. Please <b>create many paths</b> to make it <b>challenging for various SSSP algorithms</b>.'
    );
  }

  warnChecking = function () {
    var warn = "";
    if (amountVertex >= 10) warn += 'Too much vertex on screen, consider drawing smaller graph. ';

    var visited = [];
    var stack = [];
    stack.push(0);
    visited[0] = true;
    while (stack.length > 0) {
      var now = stack.pop();
      for (var key2 in iEL)
        if (iEL[key2]["u"] == now)
          if (!visited[iEL[key2]["v"]]) {
            visited[iEL[key2]["v"]] = true;
            stack.push(+iEL[key2]["v"]);
          }
    }
    for (var i = 0; i < amountVertex; ++i)
      if (!visited[i])
        warn += 'Vertex {i} is not reachable from vertex 0. ';

    if (warn == "") $("#draw-warn p").html('No Warning.');
    else $("#draw-warn p").html(warn);
  }

  errorChecking = function () {
    var error = "";
    if (amountVertex == 0) {
      $("#draw-err p").html('Graph cannot be empty.');
      return;
    }

    if (error == "") $("#draw-err p").html('No Error');
    else $("#draw-err p").html(error);
  }

  var intervalID;

  this.startLoop = function () {
    intervalID = setInterval(function () {
      takeJSON(JSONresult);
      warnChecking();
      errorChecking();
      statusChecking();
    }, 100);
  }

  this.stopLoop = function () {
    clearInterval(intervalID);
  }

  this.draw = function () {
    if ($("#draw-err p").html() != 'No Error')
      return false;
    if ($("#submit").is(':checked'))
      this.submit(JSONresult);
    if ($("#copy").is(':checked'))
      window.prompt('Copy to clipboard:', JSONresult);

    graph = createState(iVL, iEL);
    gw.updateGraph(graph, 500);
    return true;
  }

  // this.submit = function(graph) { // not used now
  //   $.ajax({
  //     url: PHP_DOMAIN + "php/Graph.php?mode=" + MODE_SUBMIT_GRAPH,
  //     type: "POST",
  //     data: {canvasWidth: 1000, canvasHeight: 500, graphTopics: 'SSSP', graphState: graph, fbAccessToken: fbAccessToken},
  //     error: function(xhr, errorType, exception) { //Triggered if an error communicating with server
  //       var errorMessage = exception || xhr.statusText; //If exception null, then default to xhr.statusText
  //       alert("There was an error submitting your graph " + errorMessage);
  //     }
  //   }).done(function(data) {
  //     $("#drawgraph-err").html(data);
  //   });
  // }

  this.importjson = function (JSON) {
    takeJSON(JSON);
    graph = createState(iVL, iEL);
    gw.updateGraph(graph, 500);
  }

  // this.initRandom = function(graph) {
  //   iVL = graph.iVL;
  //   iEL = graph.iEL;
  //   amountVertex = iVL.length;
  //   amountEdge = iEL.length;
  //   fixJSON();
  //   statusChecking();
  //   var newState = createState(iVL, iEL);
  //   gw.updateGraph(newState, 500);
  // }

  this.getGraph = function () {
    return {
      'vl': iVL,
      'el': iEL
    };
  }

  this.getV = function () {
    return amountVertex;
  }

  this.bellmanford = function (sourceVertex, callback) {
    var vertexHighlighted = {},
      edgeHighlighted = {},
      vertexTraversed = {},
      edgeGrey = {};
    var stateList = [];
    var key, i, cs;

    // error checks
    if (amountVertex == 0) { // no graph
      $('#bellmanford-err').html('Không có đồ thị để chạy. Hãy chọn một đồ thị ví dụ trước..');
      return false;
    }

    if (sourceVertex >= amountVertex || sourceVertex < 0) { // source vertex not in range
      $('#bellmanford-err').html(
        'This vertex does not exist in the graph. Please select another source vertex.');
      return false;
    }

    var d = {},
      p = {};
    for (var i = 0; i < amountVertex; i++) {
      d[i] = 999;
      p[i] = -1;
      iVL[i]["state"] = VERTEX_DEFAULT;
      iVL[i]["extratext"] = "Inf";
    }
    d[sourceVertex] = 0;

    //vertexTraversed[sourceVertex] = true;
    iVL[sourceVertex]["extratext"] = "source, 0";
    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed);
    cs["status"] = sourceVertex +
      ' is the source vertex.<br>Set p[v] = -1, d[v] = Inf, but d[" + sourceVertex + "] = 0.';
    cs["lineNo"] = 1;
    stateList.push(cs);

    delete vertexHighlighted[sourceVertex];
    var EdgeProcessed = 0;
    var NextStatus = 'This is the first pass.';

    for (var i = 1; i < amountVertex; i++) { // V-1 passes of Bellman Ford's
      var NumChange = 0;

      for (key in iEL) {
        delete edgeHighlighted[key];
        delete edgeGrey[key];
      }

      for (key in iEL)
        if (p[iEL[key]["v"]] == iEL[key]["u"]) edgeHighlighted[key] = true;
        else edgeGrey[key] = true;

      for (var key in iVL) vertexHighlighted[key] = true;
      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
      cs["status"] = NextStatus + '<br>The highlighted edges are the current SSSP spanning tree so far.';
      for (var key in iVL) delete vertexHighlighted[key];

      cs["lineNo"] = 2;
      stateList.push(cs);

      for (key in iEL) { // start afresh for next round
        delete edgeHighlighted[key];
        delete edgeGrey[key];
      }
      for (var key in iVL) delete vertexHighlighted[key];
      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
      cs["status"] = 'Prepare all edges for this #pass: ' + i + ".";
      cs["lineNo"] = 2;
      stateList.push(cs);

      for (var j = 0; j < amountEdge; j++) {
        EdgeProcessed++;
        var u = iEL[j]["u"],
          v = iEL[j]["v"],
          w = iEL[j]["w"];
        var thisStatus = "#pass: " + i + ", relax(" + u + "," + v + "," + w + "), #edge_processed = " +
          EdgeProcessed + ".";

        for (var key in iVL) delete vertexHighlighted[key]; // turn off all vertex highlights first
        vertexTraversed[u] = vertexTraversed[v] = true;
        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
        cs["vl"][u]["state"] = cs["vl"][v]["state"] = VERTEX_GREEN_FILL;
        cs["status"] = thisStatus;
        cs["lineNo"] = [3, 4];
        cs["el"][j]["animateHighlighted"] = true;
        stateList.push(cs);

        // if we can relax vertex B, do updates and some more highlights
        if ((d[u] != 999) && (w != 999) && (d[u] + w < d[v])) {
          d[v] = d[u] + w;
          p[v] = u;
          iVL[v]["extratext"] = d[v];
          thisStatus = thisStatus + "<br>d[" + v + "] = " + d[v] + ", p[" + v + "] = " + p[v] + ".";
          edgeHighlighted[j] = true;
          for (var key in iEL)
            if (iEL[key]["u"] == v && iEL[key]["v"] == u) edgeHighlighted[key] = true;
          NumChange++;
        } else {
          thisStatus = thisStatus + "<br>No change.";
          edgeGrey[j] = true;
        }

        // highlight the edge being relaxed in the input graph
        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
        cs["lineNo"] = [3, 4];
        cs["status"] = thisStatus;
        stateList.push(cs);
      }

      if (NumChange == 0) NextStatus =
        'There is no change in the last pass, we can stop Bellman Ford&#39;s now.'; // optimized Bellman Ford's
      else NextStatus = NumChange +
        ' <font color="orange">orange</font> edge relaxation(s) in the last pass, we will continue.';
    }

    for (var k = 0; k < amountVertex; k++) vertexHighlighted[k] = true;
    for (var key in iEL) {
      delete edgeHighlighted[key];
      delete edgeGrey[key];
    }
    for (var l = 0; l < amountEdge; l++)
      if (p[iEL[l]["v"]] == iEL[l]["u"]) edgeHighlighted[l] = true;
      else edgeGrey[l] = true;

    cs = processEnding(iVL, iEL, sourceVertex, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey,
      "#edge_processed = " + EdgeProcessed + ", V*E = " + amountVertex + "*" + amountEdge + " = " + (
        amountVertex * amountEdge) + ".<br>", d);
    cs["lineNo"] = [5, 6];
    stateList.push(cs);

    populatePseudocode(0);
    gw.startAnimation(stateList, callback);
    return true;
  }

  function processEnding(iVL, iEL, sourceVertex, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey,
    baseStatus, d) {
    actual_d = RunBellmanFord(iVL, iEL, sourceVertex);
    var GotWA = false;
    for (var key in iVL)
      if (d[key] != actual_d[key])
        GotWA = true;
    var last_cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
    for (var key in iVL)
      if (d[key] != actual_d[key]) {
        last_cs["vl"][key]["extratext"] = last_cs["vl"][key]["extratext"] + " => " + actual_d[key];
        last_cs["vl"][key]["state"] = VERTEX_RED_FILL;
        for (var key2 in iEL) {
          var u = iEL[key2]["u"],
            v = iEL[key2]["v"];
          if (v == key)
            last_cs["el"][key2]["state"] = EDGE_GREY; // the predecessor information is also invalid
        }
      }
    last_cs["status"] = baseStatus;
    if (!GotWA) last_cs["status"] += 'This is the SSSP spanning tree from source vertex ' + sourceVertex + ".";
    else last_cs["status"] += "<span style='color: red; background-color: white;'>" +
      'ERROR: Vertex with red color has WRONG shortest path value</span>.';
    return last_cs;
  }

  this.dijkstra = function (sourceVertex, versionType, callback) {
    var vertexHighlighted = {},
      edgeHighlighted = {},
      vertexTraversed = {},
      edgeGrey = {};
    var stateList = [];
    var key, i, cs;

    // error checks
    if (amountVertex == 0) { // no graph
      $('#dijkstra-err').html('Không có đồ thị để chạy. Hãy chọn một đồ thị ví dụ trước..');
      return false;
    }

    if (sourceVertex >= amountVertex || sourceVertex < 0) { // source vertex not in range
      $('#dijkstra-err').html('This vertex does not exist in the graph. Please select another source vertex.');
      return false;
    }

    if (versionType == 1) { // original
      isCorrect = !HasNegativeWeight(iVL, iEL);
      if (!isCorrect) {
        cs = createState(iVL, iEL);
        cs["status"] = "<span style='color: yellow; background-color: black;'>" +
          '&exist; &ge; 1 edge(s) with <b>negative weight</b>.<br>The Original Dijkstra&#39;s algorithm will likely yield wrong answer</span>.';
        cs["lineNo"] = 1;
        stateList.push(cs);
      }
    } else { // Modified
      isCorrect = !HasNegativeWeightCycle(iVL, iEL, sourceVertex);
      if (!isCorrect) {
        cs = createState(iVL, iEL);
        cs["status"] = "<span style='color: yellow; background-color: black;'>" +
          '∃ ≥ 1 <b>negative weight cycle(s) reachable from the source vertex</b>.<br>The Modified Dijkstra&#39;s algorithm will be trapped in an infinite loop</span>.';
        cs["lineNo"] = 1;
        stateList.push(cs);
      }
    }

    var d = {},
      p = {};
    for (var i = 0; i < amountVertex; i++) {
      d[i] = 999;
      p[i] = -1;
      iVL[i]["state"] = VERTEX_DEFAULT;
      iVL[i]["extratext"] = "Inf";
    }
    d[sourceVertex] = 0;

    vertexTraversed[sourceVertex] = true;
    iVL[sourceVertex]["extratext"] = "source, 0";

    var pq = [],
      done = [];
    var EdgeProcessed = 0;

    if (versionType == 1) { // original
      for (var i = 0; i < amountVertex; i++)
        if (i == sourceVertex) pq.push(new ObjectPair(0, i));
        else pq.push(new ObjectPair(999, i));
    } else // modified
      pq.push(new ObjectPair(0, sourceVertex)); // only push one

    function ShowPQ() {
      if (pq.length == 0) return "{}";
      var result = "{<span style='color: green; background-color: pink;'>(" + pq[0].getFirst() + "," + pq[0]
        .getSecond() + ")</span>";
      if (pq.length > 1) result += ", (" + pq[1].getFirst() + "," + pq[1].getSecond() + ")";
      if (pq.length > 2) result += ", (" + pq[2].getFirst() + "," + pq[2].getSecond() + ")";
      if (pq.length > 3) result += ", ...";
      return result + "}";
    }

    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
    cs["status"] = sourceVertex + ' is the source vertex.<br>Set p[v] = -1, d[v] = Inf, but d[' + sourceVertex +
      '] = 0, PQ = ' + ShowPQ() + ".";
    cs["lineNo"] = 2;
    stateList.push(cs);

    while (pq.length > 0) {
      pq.sort(ObjectPair.compare); // sort by distance, then by vertex number, lousy O(n log n) PQ update
      if (versionType == 2 && (EdgeProcessed >= 100 && HasNegativeWeightCycle(iVL, iEL,
          sourceVertex))) { // to prevent infinite loop in Modified Dijkstra on negative cycle
        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
        cs["status"] = "#edge_processed = " + EdgeProcessed +
          '... Modified Dijkstra&#39;s algorithm is stopped prematurely in order to prevent infinite loop.';
        stateList.push(cs);
        break;
      }

      var curFront = pq[0].getSecond();
      done.push(curFront);

      var newStatus = 'The current priority queue ' + ShowPQ();
      var frontitem = pq.shift(); // front most item
      var dist = frontitem.getFirst(); // not used in original dijkstra
      var f = frontitem.getSecond();
      vertexHighlighted[f] = true;

      if (versionType == 2 && dist > d[f]) {
        newStatus += ".<br>(" + dist + "," + f + ") " + 'is an old information and skipped.';
        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
        cs["vl"][f]["state"] = VERTEX_GREEN_FILL;
        cs["lineNo"] = [3, 4];
        cs["status"] = newStatus;
        stateList.push(cs);
        continue; // do not do anything else...
      } else {
        newStatus += '.<br>Exploring neighbors of vertex u = ' + f + ", d[u] = " + d[f] + ".";
        vertexTraversed[curFront] = true; // only re-highlight here
        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
        cs["vl"][f]["state"] = VERTEX_GREEN_FILL;
        cs["lineNo"] = 3;
        cs["status"] = newStatus;
        stateList.push(cs);
      }

      var neighbors = [];
      for (var j = 0; j < amountEdge; j++)
        if (iEL[j]["u"] == f) neighbors.push(j);
      neighbors.sort(function (a, b) {
        return iEL[a]["v"] - iEL[b]["v"]
      });

      while (neighbors.length > 0) {
        var j = neighbors.shift();
        var u = iEL[j]["u"],
          v = iEL[j]["v"],
          w = iEL[j]["w"];

        vertexTraversed[v] = true;
        EdgeProcessed++;
        var thisStatus = 'relax(' + u + ',' + v + ',' + w + '), #edge_processed = ' + EdgeProcessed;

        if ((d[u] != 999) && (w != 999) && (d[u] + w < d[v])) {
          d[v] = d[u] + w;
          if (versionType == 1)
            for (var k = 0; k < pq
              .length; k++) // lousy O(n) PQ update, but it works for this animation (only for version 1)
              if (pq[k].getSecond() == v) {
                pq.splice(k, 1);
                break;
              }

          edgeHighlighted[j] = true;
          for (var key in iEL)
            if (iEL[key]["u"] == v && iEL[key]["v"] == u) edgeHighlighted[key] = true;

          if ((p[v] != -1) && (p[v] != u)) { // it has a parent before and its parent is not u
            for (var k = 0; k < amountEdge; k++)
              if (iEL[k]["u"] == p[v] && iEL[k]["v"] == v) {
                delete edgeHighlighted[k];
                edgeGrey[k] = true; // now make it "grey"
              }
            else if (iEL[k]["u"] == v && iEL[k]["v"] == p[v] && edgeHighlighted[k])
              delete edgeHighlighted[k];
          }

          delete edgeGrey[j]; // just in case the update is on the same edge
          p[v] = u; // now update parent information
          iVL[v]["extratext"] = d[v];

          var canRelaxThis = true;
          for (var k = 0; k < done.length; k++)
            if (done[k] == v) {
              canRelaxThis = false;
              break;
            }

          if (versionType == 2 || canRelaxThis) // for standard dijkstra
            pq.push(new ObjectPair(d[v], parseInt(v)));

          pq.sort(ObjectPair.compare);
          thisStatus = thisStatus + ".<br>d[" + v + "] = d[" + u + "]+w(" + u + "," + v + ") = " + d[u] + "+" +
            w + " = " + d[v] + ", p[" + v + "] = " + p[v] + ", PQ = " + ShowPQ() + ".";
        } else {
          thisStatus = thisStatus + ".<br>d[" + u + "]+w(" + u + "," + v + ") > d[" + v + "], i.e. " + (d[u] ==
              999 ? "Inf" : d[u]) + "+" + w + " &gt; " + (d[v] == 999 ? "Inf" : d[v]) +
            ", so there is no change.";
          edgeGrey[j] = true; // make this grey
        }

        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
        cs["status"] = thisStatus;
        if (versionType == 1) cs["lineNo"] = [4, 5];
        else cs["lineNo"] = [5, 6];
        cs["vl"][u]["state"] = VERTEX_GREEN_FILL;
        cs["el"][j]["animateHighlighted"] = true;
        stateList.push(cs);
      }

      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
      if (versionType == 1) {
        cs["status"] = 'd[' + f + '] = ' + d[f] +
          ' is final as all outgoing edges of this vertex has been processed.';
        cs["lineNo"] = [4, 5];
      } else {
        cs["status"] = 'd[' + f + '] = ' + d[f] +
          ' can still be re-updated in the future as necessary as this vertex is only &#39;temporarily&#39; completed.';
        cs["lineNo"] = [5, 6];
      }
      stateList.push(cs);
    }

    if (versionType == 1 || (versionType == 2 && EdgeProcessed <
        100)) // to prevent infinite loop in Modified Dijkstra on negative cycle
      stateList.push(processEnding(iVL, iEL, sourceVertex, vertexHighlighted, edgeHighlighted, vertexTraversed,
        edgeGrey, "#edge_processed = " + EdgeProcessed + ", O((V+E) log V) = " + Math.ceil((amountVertex +
          amountEdge) * Math.log(amountVertex) / Math.log(2.0)) + ".<br>", d));

    if (versionType == 1) populatePseudocode(1);
    else populatePseudocode(2);

    gw.startAnimation(stateList, callback);
    return true;
  }

  this.bfs = function (sourceVertex, callback) {
    var vertexHighlighted = {},
      edgeHighlighted = {},
      vertexTraversed = {},
      edgeGrey = {};
    var stateList = [];
    var key, i, cs, isCorrect;

    // error checks
    if (amountVertex == 0) { // no graph
      $('#bfs-err').html('Không có đồ thị để chạy. Hãy chọn một đồ thị ví dụ trước..');
      return false;
    }

    if (sourceVertex >= amountVertex || sourceVertex < 0) { // source vertex not in range
      $('#bfs-err').html('This vertex does not exist in the graph. Please select another source vertex.');
      return false;
    }

    isCorrect = IsConstantWeighted(iVL, iEL);
    if (!isCorrect) {
      cs = createState(iVL, iEL);
      cs["status"] = "<span style='color: yellow; background-color: black;'>" +
        'WARNING: The graph is not an <b>unweighted/constant-weighted graph</b>.<br>BFS will likely yield wrong SSSP answer</span>.';
      cs["lineNo"] = 1;
      stateList.push(cs);
    }

    var d = {},
      p = {};
    for (var i = 0; i < amountVertex; i++) {
      d[i] = 999;
      p[i] = -1;
      iVL[i]["state"] = VERTEX_DEFAULT;
      iVL[i]["extratext"] = "Inf";
    }
    d[sourceVertex] = 0;

    vertexTraversed[sourceVertex] = true;
    iVL[sourceVertex]["extratext"] = "source, 0";
    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
    cs["status"] = sourceVertex +
      ' is the source vertex.<br>Set p[v] = -1, d[v] = Inf, but d[" + sourceVertex + "] = 0 and push this vertex to queue.';
    cs["lineNo"] = 2;
    stateList.push(cs);

    var q = [];
    q.push(sourceVertex);
    var EdgeProcessed = 0;

    function ShowQ() {
      var result = "{" + q[0];
      if (q.length > 1) result += ", " + q[1];
      if (q.length > 2) result += ", " + q[2];
      if (q.length > 3) result += ", " + q[3];
      if (q.length > 4) result += ", ...";
      return result + "}";
    }

    while (q.length > 0) {
      vertexHighlighted[q[0]] = true;
      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
      newStatus = 'The queue is now ' + ShowQ() + ".<br><span style='color: green; background-color: pink;'>" +
        'Exploring neighbors of vertex u = ' + q[0] + "</span>.";
      cs["vl"][q[0]]["state"] = VERTEX_GREEN_FILL;
      cs["status"] = newStatus;
      cs["lineNo"] = 3;
      stateList.push(cs);

      var f = q.shift(); // front most item

      var neighbors = [];
      for (var j = 0; j < amountEdge; j++)
        if (iEL[j]["u"] == f) neighbors.push(j);
      neighbors.sort(function (a, b) {
        return iEL[a]["v"] - iEL[b]["v"]
      });

      while (neighbors.length > 0) {
        var j = neighbors.shift();
        var u = iEL[j]["u"],
          v = iEL[j]["v"],
          w = iEL[j]["w"]; // w not necessarily 1, we make it more flexible

        vertexTraversed[v] = true;
        EdgeProcessed++;
        var thisStatus = "relax(" + u + "," + v + "," + w + "), #edge_processed = " + EdgeProcessed;

        if ((d[u] != 999) && (d[v] ==
            999
          )) { // only if the destination has not been visited yet (most likely lead to Wrong Answer for unweighted graphs)
          d[v] = d[u] + w;

          edgeHighlighted[j] = true;
          for (var key in iEL)
            if (iEL[key]["u"] == v && iEL[key]["v"] == u) edgeHighlighted[key] = true;

          if (p[v] != -1) { // it has a parent before
            for (var k = 0; k < amountEdge; k++)
              if (iEL[k]["u"] == p[v] && iEL[k]["v"] == v) {
                delete edgeHighlighted[k];
                edgeGrey[k] = true; // now make it "grey"
              }
            else if (iEL[k]["u"] == v && iEL[k]["v"] == p[v] && edgeHighlighted[k])
              delete edgeHighlighted[k];
          }

          q.push(v);
          delete edgeGrey[j]; // just in case the update is on the same edge
          p[v] = u;
          iVL[v]["extratext"] = d[v];
          thisStatus = thisStatus + ".<br>d[" + v + "] = " + d[v] + ", p[" + v + "] = " + p[v] + ", Q = " +
            ShowQ() + ".";
          vertexTraversed[v] = true;
        } else {
          thisStatus = thisStatus + ".<br>Destination vertex is already visited, so no change.";
          edgeGrey[j] = true;
        }

        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
        cs["status"] = thisStatus;
        if (edgeGrey[j]) cs["lineNo"] = [4, 5];
        else cs["lineNo"] = [4, 5, 6];
        cs["vl"][u]["state"] = VERTEX_GREEN_FILL;
        cs["el"][j]["animateHighlighted"] = true;
        stateList.push(cs);
      }
    }

    stateList.push(processEnding(iVL, iEL, sourceVertex, vertexHighlighted, edgeHighlighted, vertexTraversed,
      edgeGrey, "#edge_processed = " + EdgeProcessed + ", O(V+E) = " + amountVertex + "+" + amountEdge +
      " = " + (amountVertex + amountEdge) + ".<br>", d));

    populatePseudocode(3);
    gw.startAnimation(stateList, callback);
    return true;
  }

  this.dfs = function (sourceVertex, callback) {
    var vertexHighlighted = {},
      edgeHighlighted = {},
      vertexTraversed = {},
      edgeGrey = {};
    var stateList = [];
    var key, i, cs, isCorrect = true;

    // error checks
    if (amountVertex == 0) { // no graph
      $('#dfs-err').html('Không có đồ thị để chạy. Hãy chọn một đồ thị ví dụ trước..');
      return false;
    }

    if (sourceVertex >= amountVertex || sourceVertex < 0) { // source vertex not in range
      $('#dfs-err').html('This vertex does not exist in the graph. Please select another source vertex.');
      return false;
    }

    isCorrect = IsTree(iVL, iEL);
    if (!isCorrect) {
      cs = createState(iVL, iEL);
      cs["status"] = "<span style='color: yellow; background-color: black;'>" +
        'WARNING: The input graph is not an <b>undirected tree</b>.<br>DFS will likely yield wrong answer.</span>"';
      cs["lineNo"] = 1;
      stateList.push(cs);
    }

    var d = {},
      p = {};
    for (var i = 0; i < amountVertex; i++) {
      d[i] = 999;
      p[i] = -1;
      iVL[i]["state"] = VERTEX_DEFAULT;
      iVL[i]["extratext"] = "Inf";
    }
    d[sourceVertex] = 0;

    vertexTraversed[sourceVertex] = true;
    iVL[sourceVertex]["extratext"] = "source, 0";
    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
    cs["status"] = sourceVertex +
      ' is the source vertex.<br>Set p[v] = -1, d[v] = Inf, but d[" + sourceVertex + "] = 0.';
    cs["lineNo"] = 2;
    stateList.push(cs);

    var EdgeProcessed = 0;

    function dfsRecur(u) {
      vertexHighlighted[u] = true;
      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
      cs["status"] = "DFS(" + u + ")";
      cs["vl"][u]["state"] = VERTEX_GREEN_FILL;
      cs["lineNo"] = 3;
      stateList.push(cs);

      var neighbors = [];
      for (var j = 0; j < amountEdge; j++)
        if (iEL[j]["u"] == u) neighbors.push(j);
      neighbors.sort(function (a, b) {
        return iEL[a]["v"] - iEL[b]["v"]
      });

      while (neighbors.length > 0) {
        var j = neighbors.shift();
        var u = iEL[j]["u"],
          v = iEL[j]["v"],
          w = iEL[j]["w"];

        EdgeProcessed++;
        var thisStatus = "relax(" + u + "," + v + "," + w + "), #edge_processed = " + EdgeProcessed;

        if ((d[u] != 999) && (d[v] == 999)) {
          d[v] = d[u] + w;

          edgeHighlighted[j] = true;
          for (var key in iEL)
            if (iEL[key]["u"] == v && iEL[key]["v"] == u) edgeHighlighted[key] = true;

          if (p[v] != -1) { // it has a parent before
            for (var k = 0; k < amountEdge; k++)
              if (iEL[k]["u"] == p[v] && iEL[k]["v"] == v) {
                delete edgeHighlighted[k];
                edgeGrey[k] = true; // now make it "grey"
              }
            else if (iEL[k]["u"] == v && iEL[k]["v"] == p[v] && edgeHighlighted[k])
              delete edgeHighlighted[k];
          }

          delete edgeGrey[j]; // just in case the update is on the same edge
          p[v] = u;
          iVL[v]["extratext"] = d[v];
          thisStatus = thisStatus + ".<br>d[" + v + "] = " + d[v] + ", p[" + v + "] = " + p[v] + ".";
          vertexTraversed[v] = true;

          cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
          cs["lineNo"] = [4, 5, 6];
          cs["status"] = thisStatus;
          cs["el"][j]["animateHighlighted"] = true;
          stateList.push(cs);

          dfsRecur(v);

          cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
          cs["vl"][u]["state"] = VERTEX_GREEN_FILL;
          cs["vl"][v]["state"] = VERTEX_HIGHLIGHTED;
          cs["status"] = 'Finish DFS(' + v + '), backtrack to DFS(" + u + ").';
          stateList.push(cs);
        } else {
          edgeGrey[j] = true;
          cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
          thisStatus = thisStatus + ".<br>Relax not successful.";
          cs["lineNo"] = [4, 5];
          cs["status"] = thisStatus;
          cs["el"][j]["animateHighlighted"] = true;
          stateList.push(cs);
        }
      }
      vertexTraversed[u] = true;
    }
    dfsRecur(sourceVertex);

    stateList.push(processEnding(iVL, iEL, sourceVertex, vertexHighlighted, edgeHighlighted, vertexTraversed,
      edgeGrey, "#edge_processed = " + EdgeProcessed + ", O(V+E) = " + amountVertex + "+" + amountEdge +
      " = " + (amountVertex + amountEdge) + ".<br>", d));

    populatePseudocode(4);
    gw.startAnimation(stateList, callback);
    return true;
  }

  this.dp = function (sourceVertex, callback) {
    var notVisited = {},
      vertexHighlighted = {},
      edgeHighlighted = {},
      vertexTraversed = {},
      edgeTraversed = {},
      edgeGrey = {};
    var stateList = [];
    var key, i, cs, isCorrect = true;

    // error checks
    if (amountVertex == 0) { // no graph
      $('#dp-err').html('Không có đồ thị để chạy. Hãy chọn một đồ thị ví dụ trước..');
      return false;
    }

    if (sourceVertex >= amountVertex || sourceVertex < 0) { // source vertex not in range
      $('#dp-err').html('This vertex does not exist in the graph. Please select another source vertex.');
      return false;
    }

    isCorrect = IsDAG(iVL, iEL);
    if (!isCorrect) {
      $('#dp-err').html('The input graph is not a <b>Directed Acyclic Graph</b>.');
      return false;
    }

    var order = TopoSort(iVL, iEL);
    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
    cs["status"] =
      'As this is a DAG, it has at least one topological order.<br><span style="color: red; background-color: white;">One of the topological order is: {' +
      order + "}.</span>";
    for (var i = 0; i < order.length; i++)
      cs["vl"][order[i]]["extratext"] = i;
    cs["lineNo"] = 1;
    stateList.push(cs);

    var d = {};
    var p = {};
    for (var i = 0; i < amountVertex; i++) {
      d[i] = 999;
      p[i] = -1;
    }
    d[sourceVertex] = 0;

    for (key in iVL) {
      iVL[key]["state"] = VERTEX_DEFAULT;
      iVL[key]["extratext"] = "Inf";
    }

    vertexHighlighted[sourceVertex] = true;
    iVL[sourceVertex]["extratext"] = "source, 0";
    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
    cs["status"] = sourceVertex +
      ' is the source vertex.<br>Set p[v] = -1, d[v] = Inf, but d[" + sourceVertex + "] = 0.';
    cs["lineNo"] = 2;
    stateList.push(cs);

    delete vertexHighlighted[sourceVertex];
    for (key in iEL) delete edgeTraversed[key];

    var EdgeProcessed = 0;

    while (order.length > 0) {
      var u = order[0];
      order.shift();
      vertexHighlighted[u] = true;
      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
      cs["vl"][u]["state"] = VERTEX_GREEN_FILL;
      cs["status"] = 'Current topological order:' + " {<span style='color: green; background-color: pink;'>" +
        u + "</span>" + (order.length > 0 ? "," : "") + order +
        '}.<br>So, we process the outgoing edges of vertex ' + u + ".";
      cs["lineNo"] = [3, 4];
      stateList.push(cs);

      var neighbors = [];
      for (var j = 0; j < amountEdge; j++)
        if (iEL[j]["u"] == u) neighbors.push(j);
      neighbors.sort(function (a, b) {
        return iEL[a]["v"] - iEL[b]["v"]
      });

      while (neighbors.length > 0) {
        var j = neighbors.shift();
        var u = iEL[j]["u"],
          v = iEL[j]["v"],
          w = iEL[j]["w"];

        EdgeProcessed++;
        var thisStatus = "relax(" + u + "," + v + "," + w + "), #edge_processed = " + EdgeProcessed;

        if ((d[u] != 999) && (d[u] + w < d[v])) {
          d[v] = d[u] + w;

          edgeHighlighted[j] = true;
          for (var key in iEL)
            if (iEL[key]["u"] == v && iEL[key]["v"] == u) edgeHighlighted[key] = true;

          if (p[v] != -1) { // it has a parent before
            for (var k = 0; k < amountEdge; k++)
              if (iEL[k]["u"] == p[v] && iEL[k]["v"] == v) {
                delete edgeHighlighted[k];
                edgeGrey[k] = true; // now make it "grey"
              }
            else if (iEL[k]["u"] == v && iEL[k]["v"] == p[v] && edgeHighlighted[k])
              delete edgeHighlighted[k];
          }

          delete edgeGrey[j]; // just in case the update is on the same edge
          p[v] = u;
          iVL[v]["extratext"] = d[v];
          thisStatus = thisStatus + ".<br>d[" + v + "] = " + d[v] + ", p[" + v + "] = " + p[v] + ".";
          vertexTraversed[v] = true;
        } else {
          edgeGrey[j] = true;
          thisStatus = thisStatus + ".<br>Relax not successful.";
        }
        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
        cs["lineNo"] = 5;
        cs["status"] = thisStatus;
        cs["vl"][u]["state"] = VERTEX_GREEN_FILL;
        cs["el"][j]["animateHighlighted"] = true;
        stateList.push(cs);
      }
      vertexTraversed[u] = true;
    }

    for (key in iVL) delete vertexTraversed[key];
    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey);
    cs["status"] = "#edge_processed = " + EdgeProcessed + ", O(V+E) = " + amountVertex + "+" + amountEdge +
      " = " + (amountVertex + amountEdge) + '.<br>This is the SSSP spanning tree from source vertex = ' +
      sourceVertex + ".";
    stateList.push(cs);

    populatePseudocode(5);
    gw.startAnimation(stateList, callback);
    return true;
  }

  this.examples = function (id) {
    iVL = getExampleGraph(id, VL);
    iEL = getExampleGraph(id, EL);
    fixJSON();
    var newState = createState(iVL, iEL);
    gw.updateGraph(newState, 500);
    return true;
  }

  this.loadGraph = function (vertexList, edgeList) {
    iVL = vertexList;
    iEL = edgeList;
    fixJSON();
    var newState = createState(iVL, iEL);
    gw.updateGraph(newState, 500);
  }

  function createState(iVLObject, iELObject, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeGrey) {
    if (vertexHighlighted == null) vertexHighlighted = {};
    if (edgeHighlighted == null) edgeHighlighted = {};
    if (vertexTraversed == null) vertexTraversed = {};
    if (edgeGrey == null) edgeGrey = {};

    var key;
    var state = {
      "vl": {},
      "el": {}
    };

    for (key in iVLObject) {
      state["vl"][key] = {};
      state["vl"][key]["cx"] = iVLObject[key]["x"];
      state["vl"][key]["cy"] = iVLObject[key]["y"];
      state["vl"][key]["text"] = key;
      state["vl"][key]["extratext"] = iVLObject[key]["extratext"];
      if (iVLObject[key]["state"] == OBJ_HIDDEN)
        state["vl"][key]["state"] = OBJ_HIDDEN;
      else
        state["vl"][key]["state"] = VERTEX_DEFAULT;
    }

    for (key in iELObject) {
      state["el"][key] = {};
      state["el"][key]["vertexA"] = iELObject[key]["u"];
      state["el"][key]["vertexB"] = iELObject[key]["v"];
      state["el"][key]["type"] = EDGE_TYPE_DE;
      state["el"][key]["weight"] = iELObject[key]["w"];
      if (iELObject[key]["state"] == OBJ_HIDDEN)
        state["el"][key]["state"] = OBJ_HIDDEN;
      else
        state["el"][key]["state"] = EDGE_DEFAULT;
      state["el"][key]["displayWeight"] = true;
      state["el"][key]["animateHighlighted"] = false;
    }

    for (key in vertexTraversed) state["vl"][key]["state"] = VERTEX_TRAVERSED;
    for (key in vertexHighlighted) state["vl"][key]["state"] = VERTEX_HIGHLIGHTED;

    for (key in edgeHighlighted) {
      state["el"][key]["state"] = EDGE_HIGHLIGHTED;
      for (var keyR in iEL)
        if ((iEL[key]["u"] == iEL[keyR]["v"]) && (iEL[key]["v"] == iEL[keyR]["u"])) edgeHighlighted[keyR] = true;
    }

    for (key in edgeGrey) {
      var hasComplement = false,
        complementHighlighted = false;
      for (key2 in iELObject)
        if ((iELObject[key]["u"] == iELObject[key2]["v"]) && (iELObject[key]["v"] == iELObject[key2][
            "u"
          ])) { // if one on top another...
          hasComplement = true;
          for (key3 in edgeHighlighted)
            if (key3 == key2)
              complementHighlighted = true;
        }
      if (hasComplement &&
        complementHighlighted) // one on top of the other, and the other side is highlighted... hide this
        state["el"][key]["state"] = OBJ_HIDDEN;
      else // if not overlapping, grey it
        state["el"][key]["state"] = EDGE_GREY;
    }

    return state;
  }

  function populatePseudocode(act) {
    switch (act) {
      case 0: // Bellman Ford's
        $('#code1').html('initSSSP');
        $('#code2').html('for i = 1 to |V|-1');
        $('#code3').html('&nbsp;&nbsp;for each edge(u, v) in E // in Edge List order');
        $('#code4').html('&nbsp;&nbsp;&nbsp;&nbsp;relax(u, v, w(u, v))');
        $('#code5').html('for each edge(u, v) in E');
        $('#code6').html('&nbsp;&nbsp;if can still relax that edge, -&infin; cycle found');
        $('#code7').html(
          '// <b><a href="http://cpbook.net/#downloads" target="_blank">ch4_06_bellman_ford.cpp/java, ch4, CP3</a></b>'
        );
        break;
      case 1: // Original Dijkstra's
        $('#code1').html('show warning if the graph has -ve weight edge');
        $('#code2').html('initSSSP, pre-populate PQ');
        $('#code3').html('while !PQ.empty() // PQ is a Priority Queue');
        $('#code4').html('&nbsp;&nbsp;for each neighbor v of u = PQ.front(), PQ.pop()');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;relax(u, v, w(u, v)) + update PQ');
        $('#code6').html(
          '// <b><a href="http://cpbook.net/#downloads" target="_blank">ch4_05_dijkstra.cpp/java, ch4, CP3</a></b>'
        );
        $('#code7').html('');
        break;
      case 2: // Modified Dijkstra's
        $('#code1').html('show warning if the graph has -ve weight cycle');
        $('#code2').html('initSSSP, PQ.push((0,sourceVertex))');
        $('#code3').html('while !PQ.empty() // PQ is a Priority Queue');
        $('#code4').html('&nbsp;&nbsp;u = PQ.front(), PQ.pop()');
        $('#code5').html('&nbsp;&nbsp;for each neighbor v of u if u is valid');
        $('#code6').html('&nbsp;&nbsp;&nbsp;&nbsp;relax(u, v, w(u, v)) + insert new pair to PQ');
        $('#code7').html(
          '// <b><a href="http://cpbook.net/#downloads" target="_blank">ch4_05_dijkstra.cpp/java, ch4, CP3</a></b>'
        );
        break;
      case 3: // BFS
        $('#code1').html('show warning if the graph is weighted');
        $('#code2').html('initSSSP, Q.push(sourceVertex)');
        $('#code3').html('while !Q.empty() // Q is a normal Queue');
        $('#code4').html('&nbsp;&nbsp;for each neighbor v of u = Q.front(), Q.pop()');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;if !visited[v]');
        $('#code6').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;relax(u, v, w(u, v)), Q.push(v)');
        $('#code7').html(
          '// <b><a href="http://cpbook.net/#downloads" target="_blank">ch4_04_bfs.cpp/java, ch4, CP3</a></b>');
        break;
      case 4: // DFS
        $('#code1').html('show warning if the graph is not a tree');
        $('#code2').html('initSSSP, then DFS(sourceVertex)');
        $('#code3').html('DFS(u)');
        $('#code4').html('&nbsp;&nbsp;for each neighbor v of u');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;if !visited[v]');
        $('#code6').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;relax(u, v, w(u, v)), DFS(v)');
        $('#code7').html('');
        break;
      case 5: // DP
        $('#code1').html('order = Topological Sort the input DAG');
        $('#code2').html('initSSSP');
        $('#code3').html('while !order.empty()');
        $('#code4').html('&nbsp;&nbsp;u = order.front()');
        $('#code5').html('&nbsp;&nbsp;relax all outgoing edges of vertex u');
        $('#code6').html('');
        $('#code7').html('');
        break;
    }
  }
}



// SSSP_action.js
var actionsWidth = 150;
var statusCodetraceWidth = 410;
var isExamplesOpen = false,
  isBellmanFordsOpen = false,
  isDijkstrasOpen = false,
  isBFSOpen = false,
  isDFSOpen = false,
  isDPOpen = false;

function openExamples() {
  if (!isExamplesOpen) {
    $('.examples').fadeIn('fast');
    isExamplesOpen = true;
  }
}

function closeExamples() {
  if (isExamplesOpen) {
    $('.examples').fadeOut('fast');
    isExamplesOpen = false;
  }
}

function openBellmanFords() {
  if (!isBellmanFordsOpen) {
    $('.bellmanford').fadeIn('fast');
    isBellmanFordsOpen = true;
  }
}

function closeBellmanFords() {
  if (isBellmanFordsOpen) {
    $('.bellmanford').fadeOut('fast');
    $('#bellmanford-err').html("");
    isBellmanFordsOpen = false;
  }
}

function openDijkstras() {
  if (!isDijkstrasOpen) {
    $('.dijkstra').fadeIn('fast');
    isDijkstrasOpen = true;
  }
}

function closeDijkstras() {
  if (isDijkstrasOpen) {
    $('.dijkstra').fadeOut('fast');
    $('#dijkstra-err').html("");
    isDijkstrasOpen = false;
  }
}

function openBFS() {
  if (!isBFSOpen) {
    $('.bfs').fadeIn('fast');
    isBFSOpen = true;
  }
}

function closeBFS() {
  if (isBFSOpen) {
    $('.bfs').fadeOut('fast');
    $('#bfs-err').html("");
    isBFSOpen = false;
  }
}

function openDFS() {
  if (!isDFSOpen) {
    $('.dfs').fadeIn('fast');
    isDFSOpen = true;
  }
}

function closeDFS() {
  if (isDFSOpen) {
    $('.dfs').fadeOut('fast');
    $('#dfs-err').html("");
    isDFSOpen = false;
  }
}

function openDP() {
  if (!isDPOpen) {
    $('.dp').fadeIn('fast');
    isDPOpen = true;
  }
}

function closeDP() {
  if (isDPOpen) {
    $('.dp').fadeOut('fast');
    $('#dp-err').html("");
    isDPOpen = false;
  }
}

function hideEntireActionsPanel() {
  closeExamples();
  closeBellmanFords();
  closeDijkstras();
  closeBFS();
  closeDFS();
  closeDP();
  hideActionsPanel();
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

// local
write(false, false);
var ssspWidget, gw, randomGraphID;

$(function () {
  $('#play').hide();
  ssspWidget = new SSSP();
  gw = ssspWidget.getgw();
  var options = [CP3_4_3, CP3_4_4, CP3_4_17, CP3_4_18, CP3_4_19, CP3_4_40, BELLMANFORD_KILLER, DIJKSTRA_KILLER,
    DAG
  ];
  ssspWidget.examples(options[Math.floor(Math.random() * 9)]);
  randomGraphID = -1;

  var graphJSON = getQueryVariable("create");
  if (graphJSON.length > 0) {
    ssspWidget.importjson(graphJSON);
    window.history.pushState("object or string", "Title", window.location.href.split('?')[0]);
  }

  $('#examples').click(function () {
    openExamples();
    closeBellmanFords();
    closeDijkstras();
    closeBFS();
    closeDFS();
    closeDP();
  });

  $('#bellmanford').click(function () {
    closeExamples();
    openBellmanFords();
    closeDijkstras();
    closeBFS();
    closeDFS();
    closeDP();
  });

  $('#dijkstra').click(function () {
    closeExamples();
    closeBellmanFords();
    openDijkstras();
    closeBFS();
    closeDFS();
    closeDP();
  });

  $('#bfs').click(function () {
    closeExamples();
    closeBellmanFords();
    closeDijkstras();
    openBFS();
    closeDFS();
    closeDP();
  });

  $('#dfs').click(function () {
    closeExamples();
    closeBellmanFords();
    closeDijkstras();
    closeBFS();
    openDFS();
    closeDP();
  });

  $('#dp').click(function () {
    closeExamples();
    closeBellmanFords();
    closeDijkstras();
    closeBFS();
    closeDFS();
    openDP();
  });
});

// function importjson() {
//   if (isPlaying) stop();
//   if (mode == "exploration") {
//     ssspWidget.importjson();
//     closeExamples();
//     isPlaying = false;
//   }
// }

function drawGraph() {
  if (isPlaying) stop();
  if (mode == "exploration") {
    $('#dark-overlay').fadeIn(function () {
      $('#drawgraph').fadeIn();
    });
    ssspWidget.startLoop();
    isPlaying = false;
  }
}

function drawDone() {
  if (!ssspWidget.draw()) return false;
  ssspWidget.stopLoop();
  $('#drawgraph').fadeOut();
  $('#dark-overlay').fadeOut();
}

function drawCancel() {
  ssspWidget.stopLoop();
  $('#drawgraph').fadeOut();
  $('#dark-overlay').fadeOut();
}

function createRandom() {
  if (isPlaying) stop();
  if (mode == "exploration") {
    $.ajax({
      url: PHP_DOMAIN + "/php/Graph.php?mode=" + MODE_GET_RANDOM_SUBMITTED_GRAPH + "&directed=" + 1 +
        "&connected=" + 1
    }).done(function (data) {
      data = JSON.parse(data);
      var graph = extractQnGraph(data.graph);
      if (data.graphID == randomGraphID) // make sure it is different, make sure #graph > 1
        createRandom();
      randomGraphID = data.graphID;
      ssspWidget.initRandom(graph);
      $('#rate-sample-graph').show();
    })
    $('#progress-bar').slider("option", "max", 0);
    closeExamples();
    isPlaying = false;
  }
}

function example(id) {
  if (isPlaying) stop();
  setTimeout(function () {
    if (ssspWidget.examples(id)) { // (mode == "exploration") && 
      $('#progress-bar').slider("option", "max", 0);
      closeExamples();
      isPlaying = false;
    }
  }, 500);
}

function bellmanford(callback) {
  if (isPlaying) stop();
  var input = parseInt($('#bellmanford-v').val());
  commonAction(ssspWidget.bellmanford(input, callback), "BellmanFord(" + input + ")");
  setTimeout(function () {
    $("#bellmanford-v").val(1 + Math.floor(Math.random() * ssspWidget.getV()));
  }, 500); // randomized for next click between [0..V-1]
}

function dijkstra(versionType, callback) {
  if (isPlaying) stop();
  var input = parseInt($('#dijkstra-v').val());
  commonAction(ssspWidget.dijkstra(input, versionType, callback), (versionType == 1) ? ("OriginalDijkstra(" +
    input + ")") : ("ModifiedDijkstra(" + input + ")"));
  setTimeout(function () {
    $("#dijkstra-v").val(1 + Math.floor(Math.random() * ssspWidget.getV()));
  }, 500);
}

function bfs(callback) {
  if (isPlaying) stop();
  var input = parseInt($('#bfs-v').val());
  commonAction(ssspWidget.bfs(input, callback), "BFS(" + input + ")");
  setTimeout(function () {
    $("#bfs-v").val(1 + Math.floor(Math.random() * ssspWidget.getV()));
  }, 500);
}

function dfs(callback) {
  if (isPlaying) stop();
  var input = parseInt($('#dfs-v').val());
  commonAction(ssspWidget.dfs(input, callback), "DFS(" + input + ")");
  setTimeout(function () {
    $("#dfs-v").val(1 + Math.floor(Math.random() * ssspWidget.getV()));
  }, 500);
}

function dp(callback) {
  if (isPlaying) stop();
  var input = parseInt($('#dp-v').val());
  commonAction(ssspWidget.dp(input, callback), "DP(" + input + ")");
  setTimeout(function () {
    $("#dp-v").val(1 + Math.floor(Math.random() * ssspWidget.getV()));
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

function loadGraph(graph) {
  if (ssspWidget) {
    ssspWidget.loadGraph(graph['vl'], graph['el']);
  }
}

// Implement these functions in each visualisation
var userGraph = {
  'vl': {},
  'el': {},
};

// This function will be called before entering E-Lecture Mode
function ENTER_LECTURE_MODE() {
  if (ssspWidget) userGraph = ssspWidget.getGraph();
}

// This function will be called before returning to Explore Mode
function ENTER_EXPLORE_MODE() {
  loadGraph(userGraph);
}

// Lecture action functions
function CUSTOM_ACTION(action, data, mode) {
  if (action == 'bellmanford') {
    hideSlide(function () {
      $('#bellmanford-v').val(data); // force
      bellmanford(showSlide);
    });
  } else if (action == 'dijkstra') {
    hideSlide(function () {
      $('#dijkstra-v').val(data); // force
      dijkstra(1, showSlide);
    });
  } else if (action == 'dijkstra_modified') {
    hideSlide(function () {
      $('#dijkstra-v').val(data); // force
      dijkstra(2, showSlide);
    });
  } else if (action == 'bfs') {
    hideSlide(function () {
      $('#bfs-v').val(data); // force
      bfs(showSlide);
    });
  } else if (action == 'dfs') {
    hideSlide(function () {
      $('#dfs-v').val(data); // force
      dfs(showSlide);
    });
  } else if (action == 'dp') {
    hideSlide(function () {
      $('#dp-v').val(data); // force
      dp(showSlide);
    });
  }
}

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