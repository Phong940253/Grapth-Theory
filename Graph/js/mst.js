// MST Widget
// original author: Ivan Reinaldo, then maintained by Steven Halim

var MST = function () {
  var self = this;
  var gw = new GraphWidget();

  var iVL = {};
  var iEL = {};
  var iAL = {}; // special, for Prim's
  var amountVertex = 0;
  var amountEdge = 0;

  this.getGraphWidget = function () {
    return gw;
  }

  fixJSON = function () {
    amountVertex = 0;
    amountEdge = 0;
    for (var key in iVL) amountVertex++;
    for (var key in iEL) amountEdge++;

    var sortedArray = [];
    for (key in iEL) {
      sortedArray.push(new ObjectTriple(parseInt(iEL[key]["w"]), parseInt(iEL[key]["u"]), parseInt(iEL[key][
        "v"
      ])));
    }
    sortedArray.sort(ObjectTriple
      .compare); // sort by increasing w, and if ties, by increasing u, and if still ties, by increasing v

    for (var i = 0; i < sortedArray.length; i++) { // rearrange the keys in iEL based on our custom sort order
      iEL[i]["w"] = sortedArray[i].getFirst();
      iEL[i]["u"] = sortedArray[i].getSecond();
      iEL[i]["v"] = sortedArray[i].getThird();
    }

    for (var key in iVL) iAL[key] = Array();
    for (var key in iEL) { // transform EL to AL (for Prim's)
      iAL[iEL[key]["u"]].push(new ObjectTriple(iEL[key]["v"], iEL[key]["w"], key));
      iAL[iEL[key]["v"]].push(new ObjectTriple(iEL[key]["u"], iEL[key]["w"], key)); // bidirectional
    }
  }

  takeJSON = function (graph) {
    if (graph == null) return;
    graph = JSON.parse(graph);
    iVL = graph["vl"];
    iEL = graph["el"];
    fixJSON();
  }

  statusChecking = function () {
    $("#draw-status p").html("<div><br></div>");
  }

  warnChecking = function () {
    var warn = "";
    if (amountVertex >= 17) warn += "Quá nhiểu đỉnh trên màn hình, nên vẽ một đồ thị nhỏ hơn.";
    if (warn == "") $("#draw-warn p").html("No Warning");
    else $("#draw-warn p").html(warn);
  }

  errorChecking = function () {
    var error = "";
    if (amountVertex == 0) {
      $("#draw-err p").html("Đồ thị không thể rỗng.");
      return;
    }

    if (amountVertex == 1) {
      $("#draw-err p").html("Đồ thị phải chứa ít nhất một cạnh.");
      return;
    }

    var visited = [];
    var stack = [];
    stack.push(0);
    visited[0] = true;
    while (stack.length > 0) {
      var now = stack.pop();
      for (var key2 in iEL) {
        if (iEL[key2]["u"] == now && !visited[iEL[key2]["v"]]) {
          visited[iEL[key2]["v"]] = true;
          stack.push(+iEL[key2]["v"]);
        }
        if (iEL[key2]["v"] == now && !visited[iEL[key2]["u"]]) {
          visited[iEL[key2]["u"]] = true;
          stack.push(+iEL[key2]["u"]);
        }
      }
    }

    for (var i = 0; i < amountVertex; i++)
      if (!visited[i]) {
        error = error + "Đỉnh 0 và đỉnh {i} không nối với nhau.".replace("{i}", i);
        break;
      }

    if (error == "") $("#draw-err p").html("Đồ thị phải chứa ít nhất một cạnh.");
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
    if ($("#draw-err p").html() != "Đồ thị phải chứa ít nhất một cạnh.")
      return false;
    if ($("#submit").is(':checked'))
      this.submit(JSONresult);
    if ($("#copy").is(':checked'))
      window.prompt("Sao chép vào clipboard:", JSONresult);

    fixJSON(); // to re-sort the edges

    graph = createState(iVL, iEL);
    gw.updateGraph(graph, 500);
    return true;
  }

  this.importjson = function (text) {
    takeJSON(text);
    statusChecking();
    graph = createState(iVL, iEL);
    gw.updateGraph(graph, 500);
  }



  this.getGraph = function () {
    return {
      'vl': iVL,
      'el': iEL
    };
  }

  this.getV = function () {
    return amountVertex;
  }

  this.kruskal = function (callback) {
    var i, key, totalWeight = 0,
      cs;
    var stateList = [],
      sortedArray = [];
    var vertexHighlighted = {},
      edgeHighlighted = {},
      vertexTraversed = {},
      edgeTraversed = {},
      edgeQueued = {};
    var tempUfds = new UfdsHelper();

    if (amountVertex == 0) { // error check, no graph (maybe via empty JSON or faulty db)
      $('#kruskals-err').html("Không có đồ thị để chạy. Hãy chọn một đồ thị ví dụ trước..");
      return false;
    }

    for (key in iVL) tempUfds.insert(key);

    for (key in iEL) {
      edgeQueued[key] = true;
      sortedArray.push(new ObjectPair(parseInt(iEL[key]["w"]), parseInt(key)));
    }
    sortedArray.sort(ObjectPair.compare);

    function sortedArrayToString() {
      var ansStr = "";
      var maxLength = Math.min(sortedArray.length, 9);
      for (var i = 0; i < maxLength; i++) {
        var thisEdgeId = sortedArray[i].getSecond();
        ansStr += "(" + iEL[thisEdgeId]["w"] + ",(" + iEL[thisEdgeId]["u"] + "," + iEL[thisEdgeId]["v"] + "))";
        if (i < (maxLength - 1)) ansStr += ", ";
      }
      if (sortedArray.length > 10) ansStr += " ...";
      return ansStr;
    }

    cs = createState(iVL, iEL);
    cs["status"] = "Các cạnh không được sắp xếp tăng dần theo giá trị của trọng số:  " + sortedArrayToString() +
      ".";
    cs["lineNo"] = [1, 2];
    stateList.push(cs);

    numTaken = 0;
    while (sortedArray.length > 0) {
      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
        edgeQueued);
      cs["status"] = "Những cạnh còn lại là " + sortedArrayToString() + ".";
      cs["lineNo"] = 3;
      stateList.push(cs);

      var dequeuedEdge = sortedArray.shift();
      var dequeuedEdgeId = dequeuedEdge.getSecond();
      var u = iEL[dequeuedEdgeId]["u"],
        v = iEL[dequeuedEdgeId]["v"],
        w = parseInt(iEL[dequeuedEdgeId]["w"]);

      edgeHighlighted[dequeuedEdgeId] = true;
      vertexHighlighted[u] = true;
      vertexHighlighted[v] = true;

      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
        edgeQueued);
      cs["status"] = "Kiểm tra có xuất hiện một chu trình nếu chúng ta thêm cạnh này:  (" + w + ",(" + u + "," +
        v + ")).";
      cs["lineNo"] = 4;
      stateList.push(cs);

      var noCycle = false;
      if (!tempUfds.isSameSet(u, v)) {
        noCycle = true;
        tempUfds.unionSet(u, v);
        edgeTraversed[dequeuedEdgeId] = true;
        vertexTraversed[u] = true;
        vertexTraversed[v] = true;
        totalWeight += w;
      }

      delete edgeHighlighted[dequeuedEdgeId];
      delete edgeQueued[dequeuedEdgeId]
      delete vertexHighlighted[u];
      delete vertexHighlighted[v];

      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
        edgeQueued);
      if (noCycle) {
        cs["status"] =
          "Thêm cạnh đấy sẽ không tạo thành chu trình, vì thế chúng ta thêm nó vào T. Trọng số của T bây giờ là " +
          totalWeight + ".";
        cs["lineNo"] = 5;
        numTaken++;
      } else {
        cs["status"] =
          "cạnh đấy sẽ tạo thành một chu trình, vì vậy chúng ta bỏ qua nó. Trọng số hiện tại của T giữ nguyên là " +
          totalWeight + ".";
        cs["lineNo"] = 6;
      }
      stateList.push(cs);

      if (noCycle && (numTaken == amountVertex - 1)) {
        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
          edgeQueued);
        cs["status"] = (amountVertex - 1) +
          " edges have been taken by Kruskal&#39;s, so the MST has been found.<br>An optimized version of Kruskal&#39;s algorithm can stop here."; // the animation will still run until the end
        cs["lineNo"] = 5;
        stateList.push(cs);
      }
    }

    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, edgeQueued);
    cs["status"] = "The highlighted vertices and edges form an MST with weight = " + totalWeight +
      ".<br><b><a href=\"https://cpbook.net/#downloads\" target=\"_blank\">ch4_03_kruskal_prim.cpp/java, ch4.zip, CP3</a></b>.";
    cs["lineNo"] = 7;
    stateList.push(cs);

    populatePseudocode(1);
    gw.startAnimation(stateList, callback);
    return true;
  }

  this.prim = function (sourceVertex, callback) {
    var i, key, totalWeight = 0,
      cs;
    var visited = {},
      vertexHighlighted = {},
      edgeHighlighted = {},
      vertexTraversed = {},
      edgeTraversed = {},
      edgeQueued = {};
    var stateList = [];

    // error checks
    if (amountVertex == 0) { // no graph
      $('#prims-err').html("Không có đồ thị để chạy. Hãy chọn một đồ thị ví dụ trước..");
      return false;
    }

    if (sourceVertex >= amountVertex || sourceVertex < 0) { // start vertex not in range
      $('#prims-err').html("Cạnh này không tồn tại trong đồ thị");
      return false;
    }

    for (key in iVL) visited[key] = false;
    vertexTraversed[sourceVertex] = true;
    for (var key in iVL) iVL[key]["extratext"] = "";
    iVL[sourceVertex]["extratext"] = "source";
    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, edgeQueued);
    cs["status"] = "T = {" + sourceVertex + "}.";
    cs["lineNo"] = 1;
    stateList.push(cs);

    delete vertexHighlighted[sourceVertex];
    vertexTraversed[sourceVertex] = true;

    var sortedArray = [];
    var enqueuedToString = "";

    function sortedArrayToString() {
      var ansStr = "";
      var maxLength = Math.min(sortedArray.length, 6);
      for (var i = 0; i < maxLength; i++) {
        var thisTriple = sortedArray[i];
        ansStr += "(" + thisTriple.getFirst() + "," + thisTriple.getSecond() + ")";
        if (i < (maxLength - 1)) ansStr += ", ";
      }
      if (sortedArray.length > 6) ansStr += "..";
      if (ansStr == "") ansStr = "empty";
      return ansStr;
    }

    function process(vtx) {
      enqueuedToString = "";
      visited[vtx] = true;
      for (key in iAL[vtx]) {
        var v = iAL[vtx][key].getFirst();
        var w = iAL[vtx][key].getSecond();
        var enqueuedEdgeId = iAL[vtx][key].getThird();
        if (!visited[v]) {
          enqueuedEdge = new ObjectTriple(parseInt(w), parseInt(v), parseInt(enqueuedEdgeId));
          edgeQueued[enqueuedEdgeId] = true;
          enqueuedToString += "(" + w + "," + v + "), ";
          sortedArray.push(enqueuedEdge);
        }
      }
      enqueuedToString = enqueuedToString.substring(0, enqueuedToString.length - 2);
      sortedArray.sort(ObjectTriple.compare);
    }

    process(sourceVertex);

    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, edgeQueued);
    cs["status"] = enqueuedToString + " is added to the PQ.<br>The PQ is now " + sortedArrayToString() + ".";
    cs["lineNo"] = 2;
    stateList.push(cs);

    var numTaken = 1;
    while (sortedArray.length > 0) {
      var dequeuedEdge = sortedArray.shift();
      var otherVertex = dequeuedEdge.getSecond();
      var edgeId = dequeuedEdge.getThird();

      vertexHighlighted[otherVertex] = true;
      edgeHighlighted[edgeId] = true;
      cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
        edgeQueued);
      cs["status"] = "(" + dequeuedEdge.getFirst() + "," + otherVertex +
        ") bị loại bỏ ra khỏi PQ. Kiểm tra nếu cạnh " + otherVertex + " is in T.<br>The PQ is now " +
        sortedArrayToString() + ".";
      cs["lineNo"] = 4;
      stateList.push(cs);

      if (!visited[otherVertex]) {
        delete edgeHighlighted[edgeId];
        edgeHighlighted[edgeId] = true;
        vertexHighlighted[otherVertex] = true;

        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
          edgeQueued);
        cs["status"] = otherVertex + " không nằm trong T.";
        cs["lineNo"] = 4;
        stateList.push(cs);

        delete vertexHighlighted[otherVertex];
        delete edgeHighlighted[edgeId];
        edgeTraversed[edgeId] = true;
        vertexTraversed[otherVertex] = true;

        process(otherVertex);

        totalWeight += parseInt(dequeuedEdge.getFirst());
        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
          edgeQueued);
        cs["status"] = otherVertex + " and this edge are added into T (T\\&#39;s weight = " + totalWeight +
          "), " + (enqueuedToString.length > 0 ? enqueuedToString : "(null)") +
          " is also added to PQ. The PQ is now " + sortedArrayToString() + ".";
        cs["lineNo"] = 5;
        stateList.push(cs);

        numTaken++;
        if (numTaken == amountVertex) { // to show that we can optimize Prim's a bit.
          cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
            edgeQueued);
          cs["status"] = numTaken +
            " vertices have been taken by Prim\\&#39;s, so the MST has been found.<br>An optimized version of Prim\\&#39;s algorithm can stop here."; // For now, we will continue until the PQ is empty
          cs["lineNo"] = 5;
          stateList.push(cs);
        }
      } else {
        delete edgeQueued[edgeId];
        delete edgeHighlighted[edgeId];

        cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
          edgeQueued);
        cs["status"] = otherVertex + " có trong T, bỏ qua cạnh này.";
        cs["lineNo"] = 6;
        stateList.push(cs);
      }
    }

    cs = createState(iVL, iEL, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, edgeQueued);
    cs["status"] = "The highlighted vertices and edges form an MST with weight = " + totalWeight +
      '.<br><b><a href="https://cpbook.net/#downloads" target="_blank">ch4_03_kruskal_prim.cpp/java, ch4.zip, CP3.</a></b>';
    cs["lineNo"] = 7;
    stateList.push(cs);

    populatePseudocode(0);
    gw.startAnimation(stateList, callback);
    return true;
  }

  this.examples = function (id) {
    var vertexList = getExampleGraph(id, VL);
    var edgeList = getExampleGraph(id, EL);
    this.loadGraph(vertexList, edgeList);
    return true;
  }

  this.loadGraph = function (vertexList, edgeList) {
    iVL = vertexList;
    iEL = edgeList;
    fixJSON();
    var newState = createState(iVL, iEL);
    gw.updateGraph(newState, 500);
  }

  function createState(iVLObject, iELObject, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed,
    edgeQueued) {
    var isDefaultGrey = true;
    if ((vertexHighlighted == null) && (edgeHighlighted == null) && (vertexTraversed == null) && (edgeTraversed ==
        null) && (edgeQueued == null))
      isDefaultGrey = false;
    if (vertexHighlighted == null) vertexHighlighted = {};
    if (edgeHighlighted == null) edgeHighlighted = {};
    if (vertexTraversed == null) vertexTraversed = {};
    if (edgeTraversed == null) edgeTraversed = {};
    if (edgeQueued == null) edgeQueued = {};

    var key;
    var state = {
      "vl": {},
      "el": {}
    };

    if (isDefaultGrey) {
      for (key in iVLObject) {
        state["vl"][key] = {};
        state["vl"][key]["cx"] = iVLObject[key]["x"];
        state["vl"][key]["cy"] = iVLObject[key]["y"];
        state["vl"][key]["text"] = key;
        state["vl"][key]["state"] = VERTEX_GREY_OUTLINE;
        state["vl"][key]["extratext"] = iVLObject[key]["extratext"];
      }
      for (key in iELObject) {
        state["el"][key] = {};
        state["el"][key]["vertexA"] = iELObject[key]["u"];
        state["el"][key]["vertexB"] = iELObject[key]["v"];
        state["el"][key]["type"] = EDGE_TYPE_UDE;
        state["el"][key]["weight"] = iELObject[key]["w"];
        state["el"][key]["state"] = EDGE_GREY;
        state["el"][key]["displayWeight"] = true;
        state["el"][key]["animateHighlighted"] = false;
      }
    } else {
      for (key in iVLObject) {
        state["vl"][key] = {};
        state["vl"][key]["cx"] = iVLObject[key]["x"];
        state["vl"][key]["cy"] = iVLObject[key]["y"];
        state["vl"][key]["text"] = key;
        state["vl"][key]["state"] = VERTEX_DEFAULT;
        state["vl"][key]["extratext"] = iVLObject[key]["extratext"];
      }
      for (key in iELObject) {
        state["el"][key] = {};
        state["el"][key]["vertexA"] = iELObject[key]["u"];
        state["el"][key]["vertexB"] = iELObject[key]["v"];
        state["el"][key]["type"] = EDGE_TYPE_UDE;
        state["el"][key]["weight"] = iELObject[key]["w"];
        state["el"][key]["state"] = EDGE_DEFAULT;
        state["el"][key]["displayWeight"] = true;
        state["el"][key]["animateHighlighted"] = false;
      }
    }

    for (key in edgeQueued) {
      key1 = state["el"][key]["vertexA"];
      key2 = state["el"][key]["vertexB"]
      state["vl"][key1]["state"] = VERTEX_DEFAULT;
      state["vl"][key2]["state"] = VERTEX_DEFAULT;
      state["el"][key]["state"] = EDGE_DEFAULT;
    }

    for (key in vertexHighlighted) state["vl"][key]["state"] = VERTEX_HIGHLIGHTED; // VERTEX_BLUE_FILL;
    for (key in edgeHighlighted) state["el"][key]["state"] = EDGE_HIGHLIGHTED; // EDGE_BLUE;
    for (key in vertexTraversed) state["vl"][key]["state"] = VERTEX_TRAVERSED; // VERTEX_GREEN_FILL;
    for (key in edgeTraversed) state["el"][key]["state"] = EDGE_TRAVERSED; // EDGE_GREEN;

    return state;
  }

  function populatePseudocode(act) {
    switch (act) {
      case 0: // Prim's
        $('#code1').html('T = {s}');
        $('#code2').html("enqueue edges connected to s in PQ (by inc weight)");
        $('#code3').html('while (!PQ.isEmpty)');
        $('#code4').html('&nbsp;&nbsp;if (vertex v linked with e = PQ.remove &notin; T)');
        $('#code5').html("&nbsp;&nbsp;&nbsp;&nbsp;T = T &cup; {v, e}, enqueue edges connected to v");
        $('#code6').html("&nbsp;&nbsp;else ignore e");
        $('#code7').html(
          'MST = T // <b><a href="https://cpbook.net/#downloads" target="_blank">ch4_03_kruskal_prim.cpp/java, ch4, CP3</a></b>'
        );
        break;
      case 1: // Kruskal's
        $('#code1').html("Sắp xếp E cạnh tăng dần theo trọng số");
        $('#code2').html('T = {}');
        $('#code3').html('for (i = 0; i &lt; edgeList.length; i++)');
        $('#code4').html("&nbsp;&nbsp;nếu thêm e = edgelist[i] không tạo thành một chu trình");
        $('#code5').html("&nbsp;&nbsp;&nbsp;&nbsp;thêm e vào T");
        $('#code6').html("&nbsp;&nbsp;else ignore e");
        $('#code7').html(
          'MST = T // <b><a href="https://cpbook.net/#downloads" target="_blank">ch4_03_kruskal_prim.cpp/java, ch4, CP3</a></b>'
        );
        break;
    }
  }
}



// MST Actions
var actionsWidth = 150;
var statusCodetraceWidth = 430;

var isExamplesOpen = false,
  isPrimsOpen = false;

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

function openPrims() {
  if (!isPrimsOpen) {
    $('.prims').fadeIn('fast');
    isPrimsOpen = true;
  }
}

function closePrims() {
  if (isPrimsOpen) {
    $('.prims').fadeOut('fast');
    $('#prims-err').html("");
    isPrimsOpen = false;
  }
}

function hideEntireActionsPanel() {
  closeExamples();
  closePrims();
  hideActionsPanel();
}



// local
write(true, false);
var mw, gw, randomGraphID;

$(function () {
  $('#play').hide();
  mw = new MST();
  gw = mw.getGraphWidget();
  var options = [CP3_4_10, CP3_4_14, K5, RAIL, TESSELLATION];
  mw.examples(options[Math.floor(Math.random() * 5)]);
  randomGraphID = -1;

  var graphJSON = getQueryVariable("create");
  if (graphJSON.length > 0) {
    importjson(graphJSON);
    window.history.pushState("object or string", "Title", window.location.href.split('?')[0]);
  }

  $('#draw').click(function () {
    closeExamples();
    closePrims();
  });

  $('#random').click(function () {
    closeExamples();
    closePrims();
  });

  $('#examples').click(function () {
    openExamples();
    closePrims();
  })

  $('#kruskals').click(function () {
    closeExamples();
    closePrims();
  });

  $('#prims').click(function () {
    closeExamples();
    openPrims();
  });
});

function importjson(text) {
  if (isPlaying) stop();
  if (mode == "exploration") {
    mw.importjson(text);
    closeExamples();
    isPlaying = false;
  }
}

function drawGraph() {
  if (isPlaying) stop();
  if (mode == "exploration") {
    $('#dark-overlay').fadeIn(function () {
      $('#drawgraph').fadeIn();
    });
    mw.startLoop();
    isPlaying = false;
  }
}

function drawDone() {
  if (!mw.draw()) return false;
  mw.stopLoop();
  $('#drawgraph').fadeOut();
  $('#dark-overlay').fadeOut();
}

function drawCancel() {
  mw.stopLoop();
  $('#drawgraph').fadeOut();
  $('#dark-overlay').fadeOut();
}

// function createRandom() {
//   if (isPlaying) stop();
//   if (mode == "exploration") {
//     $.ajax({
//       url: PHP_DOMAIN + "/php/Graph.php?mode=" + MODE_GET_RANDOM_SUBMITTED_GRAPH + "&directed=" + 0 + "&connected=" + 1 // + "&topic=MST"
//     }).done(function(data) {
//       data = jQuery.parseJSON(data); // JSON.parse(data);
//       var graph = extractQnGraph(data.graph);
//       if (data.graphID == randomGraphID) // make sure it is different, make sure #graph > 1
//         createRandom();
//       randomGraphID = data.graphID;
//       mw.initRandom(graph);
//       $('#rate-sample-graph').show();
//     })
//     $('#progress-bar').slider("option", "max", 0);
//     closeExamples();
//     isPlaying = false;
//   }
// }

function example(id) {
  if (isPlaying) stop();
  setTimeout(function () {
    if ((mode == "exploration") && mw.examples(id)) {
      $('#progress-bar').slider("option", "max", 0);
      closeExamples();
      isPlaying = false;
    }
  }, 500);
}

function kruskals(callback) {
  if (isPlaying) stop();
  commonAction(mw.kruskal(callback), "Thuật toán Kruskal");
}

function prims() {
  if (isPlaying) stop();
  var input = parseInt($('#prim-v').val());
  primsWithInput(input);
}

function primsWithInput(input, callback) {
  commonAction(mw.prim(input, callback), "Thuật toán Prim, s = " + input);
  setTimeout(function () {
    $('#prim-v').val(Math.floor(Math.random() * mw.getV()));
  }, 500); // randomized for next click between [0..V-1]
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
  if (mw) {
    mw.loadGraph(graph['vl'], graph['el']);
  }
}

// Implement these functions in each visualisation
var userGraph = {
  'vl': {},
  'el': {},
};

// This function will be called before entering E-Lecture Mode
function ENTER_LECTURE_MODE() {
  if (mw) userGraph = mw.getGraph();
}

// This function will be called before returning to Explore Mode
function ENTER_EXPLORE_MODE() {
  loadGraph(userGraph);
}

// Lecture action functions
function CUSTOM_ACTION(action, data, mode) {
  if (action == 'kruskal') {
    hideSlide(function () {
      kruskals(showSlide);
    });
  } else if (action == 'prim') {
    hideSlide(function () {
      primsWithInput(data, showSlide);
    });
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

function loadFileAsText() {
  var fileToLoad = document.getElementById("uploader").files[0];

  var fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    document.getElementById("myTextarea").value = textFromFileLoaded;
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
  closeUploadFile();
  example(mst);
}