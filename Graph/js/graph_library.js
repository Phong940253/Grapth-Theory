var Adja_Matrix={};
var Adja_Matrix_E={};

function readGraph() {
    
    a = document.getElementById("myTextarea").value;
    //document.getElementById("demo").innerHTML = a;
    Adja_Matrix = {};
    Adja_Matrix_E = {};
    //line
    a = a.split('\n');
    for (i = 1; i <= a[0][0]; i++) {
        a[i] = a[i].split(" ");
    }

    let checkX=[];
    let checkY=[];
    for(i=0; i<a[0][0]; i++){
        XX=Math.floor(Math.random()*630)+10;
        YY=Math.floor(Math.random()*350)+10;
        goTo=false;
        for(j=0; j<checkY.length; j++){
            if(Math.abs(XX-checkX[j]) <=60 && Math.abs(YY-checkY[j]) <=60){
                goTo=true;
                break;
            }
        }
        if(goTo==false){
            checkX.push(XX);
            checkY.push(YY);
            tep={
                    
                    x: XX,
                    y: YY
                }     
            Adja_Matrix[i]=tep;
        }
        else i--;
    }
    let k=0;
    for(i=1; i<=a[0][0]; i++){
        for(j=0; j<a[0][0]; j++){
            if(a[i][j]!=0 && j!=i-1){
                temp={
                        u: i-1 , v: j , w:  a[i][j]
                    }                        
                
                Adja_Matrix_E[k]=temp;
                k++;
                }
                
            }
        }
    matrik = false;
}

function readGraphMST() {
    a = document.getElementById("myTextarea").value;
    //document.getElementById("demo").innerHTML = a;
    Adja_Matrix = {};
    Adja_Matrix_E = {};
    //line
    a = a.split('\n');
    for (i = 1; i <= a[0][0]; i++) {
        a[i] = a[i].split(" ");
    }

    let checkX=[];
    let checkY=[];
    for(i=0; i<a[0][0]; i++){
        XX=Math.floor(Math.random()*630)+10;
        YY=Math.floor(Math.random()*350)+10;
        goTo=false;
        for(j=0; j<checkY.length; j++){
            if(Math.abs(XX-checkX[j]) <=60 && Math.abs(YY-checkY[j]) <=60){
                goTo=true;
                break;
            }
        }
        if(goTo==false){
            checkX.push(XX);
            checkY.push(YY);
            tep={
                    
                    x: XX,
                    y: YY
                }     
            Adja_Matrix[i]=tep;
        }
        else i--;
    }
    let k=0;
    for(i=1; i<=a[0][0]; i++){
        for(j=i - 1; j<a[0][0]; j++){
            if(a[i][j]!=0 && j!=i-1){
                temp={
                        u: i-1 , v: j , w:  a[i][j]
                    }                        
                
                Adja_Matrix_E[k]=temp;
                k++;
                }
                
            }
        }
    matrik = false;
}
    
function IsUndirected(t, e) {
    if (0 == t.length) return !0;
    var r = [];
    for (var i in t) {
        r[i] = [];
        for (var n in t) r[i][n] = 0;
    }
    for (var a in e) {
        var l = e[a].u,
            o = e[a].v,
            u = e[a].w;
        r[l][o] = u;
    }
    for (var i in t) for (var n in t) if (r[i][n] != r[n][i]) return !1;
    return !0;
}
function IsConstantWeighted(t, e) {
    if (0 == t.length) return !0;
    var r = e[0].w;
    for (var i in e) if (e[i].w != r) return !1;
    return !0;
}
function HasNegativeWeight(t, e) {
    if (0 == t.length) return !1;
    for (var r in e) if (parseInt(e[r].w) < 0) return !0;
    return !1;
}
function RunBellmanFord(t, e, r) {
    function i(t) {
        o[t] = !0;
        for (var r in e) e[r].u === t && !1 === o[e[r].v] && i(e[r].v);
    }
    if (0 == t.length) return {};
    var n = 0,
        a = 0,
        l = {},
        o = [];
    for (var u in t) n++, (l[u] = 999), (o[u] = !1);
    l[parseInt(r)] = 0;
    for (var u in e) a++;
    for (var f = 1; f < n; f++)
        for (var u in e) {
            var s = e[u].u,
                x = e[u].v,
                d = e[u].w;
            999 != l[s] && 999 != d && l[s] + d < l[x] && (l[x] = l[s] + d);
        }
    var h = !1;
    for (var u in e) {
        var s = e[u].u,
            x = e[u].v,
            d = e[u].w;
        999 != l[s] && l[s] + d < l[x] && (i(s), (h = !0));
    }
    if (h) for (var u in t) o[u] && (l[u] = "??");
    return l;
}
function HasNegativeWeightCycle(t, e, r) {
    if (0 == t.length) return !1;
    var i = 0,
        n = 0,
        a = {};
    for (var l in t) i++, (a[l] = 999);
    a[parseInt(r)] = 0;
    for (var l in e) n++;
    for (var o = 1; o < i; o++)
        for (var l in e) {
            var u = e[l].u,
                f = e[l].v,
                s = e[l].w;
            999 != a[u] && 999 != s && a[u] + s < a[f] && (a[f] = a[u] + s);
        }
    var x = !1;
    for (var l in e) {
        var u = e[l].u,
            f = e[l].v,
            s = e[l].w;
        999 != a[u] && a[u] + s < a[f] && (x = !0);
    }
    return x;
}
function getExampleGraph(t, e) {
    if(t==matrixx){
        readGraph();
        if(e==VL) return Adja_Matrix;
        if(e==EL) return Adja_Matrix_E;
    }
    if(t==mst){
        readGraphMST();
        if(e==VL) return Adja_Matrix;
        if(e==EL) return Adja_Matrix_E;
    }
    if (t == CP3_4_1) {
        if (e == VL)
            return {
                0: { x: 200, y: 50 },
                1: { x: 300, y: 50 },
                2: { x: 300, y: 150 },
                3: { x: 400, y: 50 },
                4: { x: 500, y: 50 },
                5: { x: 600, y: 50 },
                6: { x: 500, y: 150 },
                7: { x: 400, y: 150 },
                8: { x: 600, y: 150 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 1 },
                1: { u: 1, v: 0, w: 1 },
                2: { u: 1, v: 2, w: 1 },
                3: { u: 1, v: 3, w: 1 },
                4: { u: 2, v: 1, w: 1 },
                5: { u: 2, v: 3, w: 1 },
                6: { u: 3, v: 1, w: 1 },
                7: { u: 3, v: 2, w: 1 },
                8: { u: 3, v: 4, w: 1 },
                9: { u: 4, v: 3, w: 1 },
                10: { u: 6, v: 7, w: 1 },
                11: { u: 6, v: 8, w: 1 },
                12: { u: 7, v: 6, w: 1 },
                13: { u: 8, v: 6, w: 1 },
            };
    }
    else if (t == CP3_4_3) {
        if (e == VL)
            return {
                0: { x: 200, y: 50 },
                1: { x: 300, y: 50 },
                2: { x: 400, y: 50 },
                3: { x: 500, y: 50 },
                4: { x: 200, y: 150 },
                5: { x: 300, y: 150 },
                6: { x: 400, y: 150 },
                7: { x: 500, y: 150 },
                8: { x: 200, y: 250 },
                9: { x: 200, y: 350 },
                10: { x: 300, y: 350 },
                11: { x: 400, y: 350 },
                12: { x: 500, y: 350 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 1 },
                1: { u: 0, v: 4, w: 1 },
                2: { u: 1, v: 0, w: 1 },
                3: { u: 1, v: 2, w: 1 },
                4: { u: 1, v: 5, w: 1 },
                5: { u: 2, v: 1, w: 1 },
                6: { u: 2, v: 3, w: 1 },
                7: { u: 2, v: 6, w: 1 },
                8: { u: 3, v: 2, w: 1 },
                9: { u: 3, v: 7, w: 1 },
                10: { u: 4, v: 0, w: 1 },
                11: { u: 4, v: 8, w: 1 },
                12: { u: 5, v: 1, w: 1 },
                13: { u: 5, v: 6, w: 1 },
                14: { u: 5, v: 10, w: 1 },
                15: { u: 6, v: 2, w: 1 },
                16: { u: 6, v: 5, w: 1 },
                17: { u: 6, v: 11, w: 1 },
                18: { u: 7, v: 3, w: 1 },
                19: { u: 7, v: 12, w: 1 },
                20: { u: 8, v: 4, w: 1 },
                21: { u: 8, v: 9, w: 1 },
                22: { u: 9, v: 8, w: 1 },
                23: { u: 9, v: 10, w: 1 },
                24: { u: 10, v: 5, w: 1 },
                25: { u: 10, v: 9, w: 1 },
                26: { u: 10, v: 11, w: 1 },
                27: { u: 11, v: 6, w: 1 },
                28: { u: 11, v: 10, w: 1 },
                29: { u: 11, v: 12, w: 1 },
                30: { u: 12, v: 7, w: 1 },
                31: { u: 12, v: 11, w: 1 },
            };
    } else if (t == CP3_4_4) {
        if (e == VL)
            return {
                0: { x: 200, y: 50 },
                1: { x: 300, y: 50 },
                2: { x: 300, y: 150 },
                3: { x: 400, y: 50 },
                4: { x: 500, y: 50 },
                5: { x: 600, y: 50 },
                6: { x: 400, y: 150 },
                7: { x: 500, y: 150 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 1 },
                1: { u: 0, v: 2, w: 1 },
                2: { u: 1, v: 2, w: 1 },
                3: { u: 1, v: 3, w: 1 },
                4: { u: 2, v: 3, w: 1 },
                5: { u: 2, v: 5, w: 1 },
                6: { u: 3, v: 4, w: 1 },
                7: { u: 7, v: 6, w: 1 },
            };
    } else if (t == CP3_4_9) {
        if (e == VL)
            return {
                0: { x: 200, y: 50 },
                1: { x: 300, y: 50 },
                2: { x: 300, y: 150 },
                3: { x: 400, y: 50 },
                4: { x: 500, y: 50 },
                5: { x: 600, y: 50 },
                6: { x: 500, y: 150 },
                7: { x: 600, y: 150 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 1 },
                1: { u: 1, v: 3, w: 1 },
                2: { u: 3, v: 2, w: 1 },
                3: { u: 2, v: 1, w: 1 },
                4: { u: 3, v: 4, w: 1 },
                5: { u: 4, v: 5, w: 1 },
                6: { u: 5, v: 7, w: 1 },
                7: { u: 7, v: 6, w: 1 },
                8: { u: 6, v: 4, w: 1 },
            };
    } else if (t == CP3_4_10) {
        if (e == VL)
            return {
                0: { x: 200, y: 150 },
                1: { x: 300, y: 50 },
                2: { x: 400, y: 150 },
                3: { x: 300, y: 250 },
                4: { x: 200, y: 350 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 4 },
                1: { u: 0, v: 2, w: 4 },
                2: { u: 0, v: 3, w: 6 },
                3: { u: 0, v: 4, w: 6 },
                4: { u: 1, v: 2, w: 2 },
                5: { u: 2, v: 3, w: 8 },
                6: { u: 3, v: 4, w: 9 },
            };
    } else if (t == CP3_4_14) {
        if (e == VL)
            return {
                0: { x: 200, y: 50 },
                1: { x: 350, y: 200 },
                2: { x: 350, y: 50 },
                3: { x: 500, y: 200 },
                4: { x: 350, y: 350 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 9 },
                1: { u: 0, v: 2, w: 75 },
                2: { u: 1, v: 2, w: 95 },
                3: { u: 1, v: 3, w: 19 },
                4: { u: 1, v: 4, w: 42 },
                5: { u: 2, v: 3, w: 51 },
                6: { u: 3, v: 4, w: 31 },
            };
    } else if (t == CP3_4_17) {
        if (e == VL)
            return {
                0: { x: 315, y: 120 },
                1: { x: 200, y: 50 },
                2: { x: 355, y: 195 },
                3: { x: 490, y: 50 },
                4: { x: 370, y: 290 },
            };
        if (e == EL)
            return {
                0: { u: 1, v: 4, w: 6 },
                1: { u: 1, v: 3, w: 3 },
                2: { u: 0, v: 1, w: 2 },
                3: { u: 2, v: 4, w: 1 },
                4: { u: 0, v: 2, w: 6 },
                5: { u: 3, v: 4, w: 5 },
                6: { u: 0, v: 3, w: 7 },
            };
    } else if (t == CP3_4_18) {
        if (e == VL)
            return {
                0: { x: 200, y: 125 },
                1: { x: 300, y: 50 },
                2: { x: 300, y: 200 },
                3: { x: 400, y: 125 },
                4: { x: 500, y: 125 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 1 },
                1: { u: 1, v: 3, w: 2 },
                2: { u: 3, v: 4, w: 3 },
                3: { u: 0, v: 2, w: 10 },
                4: { u: 2, v: 3, w: -10 },
            };
    } else if (t == CP3_4_19) {
        if (e == VL)
            return {
                0: { x: 200, y: 50 },
                1: { x: 300, y: 50 },
                2: { x: 400, y: 50 },
                3: { x: 500, y: 50 },
                4: { x: 300, y: 125 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 99 },
                1: { u: 1, v: 2, w: 15 },
                2: { u: 2, v: 1, w: -42 },
                3: { u: 2, v: 3, w: 10 },
                4: { u: 0, v: 4, w: -99 },
            };
    } else if (t == CP3_4_24) {
        if (e == VL)
            return {
                0: { x: 200, y: 50 },
                1: { x: 400, y: 50 },
                2: { x: 200, y: 250 },
                3: { x: 400, y: 250 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 4 },
                1: { u: 1, v: 3, w: 8 },
                2: { u: 0, v: 2, w: 8 },
                3: { u: 2, v: 3, w: 3 },
                4: { u: 2, v: 1, w: 1 },
                5: { u: 1, v: 2, w: 1 },
            };
    } else if (t == CP3_4_26_1) {
        if (e == VL)
            return {
                0: { x: 200, y: 150 },
                1: { x: 400, y: 250 },
                2: { x: 300, y: 50 },
                3: { x: 300, y: 250 },
                4: { x: 500, y: 150 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 2, w: 5 },
                1: { u: 0, v: 3, w: 3 },
                2: { u: 2, v: 3, w: 3 },
                3: { u: 3, v: 1, w: 5 },
                4: { u: 2, v: 1, w: 3 },
                5: { u: 2, v: 4, w: 3 },
                6: { u: 1, v: 4, w: 7 },
            };
    } else if (t == CP3_4_26_2) {
        if (e == VL)
            return {
                0: { x: 200, y: 150 },
                1: { x: 400, y: 250 },
                2: { x: 300, y: 50 },
                3: { x: 300, y: 250 },
                4: { x: 500, y: 150 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 2, w: 5 },
                1: { u: 0, v: 3, w: 3 },
                2: { u: 2, v: 3, w: 3 },
                3: { u: 3, v: 1, w: 5 },
                4: { u: 2, v: 1, w: 3 },
                5: { u: 2, v: 4, w: 3 },
                6: { u: 1, v: 4, w: 4 },
            };
    } else if (t == CP3_4_26_3) {
        if (e == VL)
            return {
                0: { x: 200, y: 150 },
                1: { x: 400, y: 250 },
                2: { x: 300, y: 50 },
                3: { x: 300, y: 250 },
                4: { x: 500, y: 150 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 2, w: 5 },
                1: { u: 0, v: 3, w: 3 },
                2: { u: 3, v: 1, w: 5 },
                3: { u: 2, v: 1, w: 2 },
                4: { u: 2, v: 4, w: 2 },
                5: { u: 1, v: 4, w: 7 },
            };
    } else if (t == CP3_4_40) {
        if (e == VL)
            return {
                0: { x: 300, y: 50 },
                1: { x: 400, y: 125 },
                2: { x: 400, y: 275 },
                3: { x: 300, y: 200 },
                4: { x: 200, y: 275 },
                5: { x: 200, y: 125 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 2 },
                1: { u: 0, v: 5, w: 4 },
                2: { u: 1, v: 0, w: 2 },
                3: { u: 1, v: 3, w: 9 },
                4: { u: 2, v: 3, w: 5 },
                5: { u: 3, v: 1, w: 9 },
                6: { u: 3, v: 2, w: 5 },
                7: { u: 3, v: 4, w: 1 },
                8: { u: 4, v: 3, w: 1 },
                9: { u: 5, v: 0, w: 4 },
            };
    } else if (t == K5) {
        if (e == VL)
            return {
                0: { x: 280, y: 150 },
                1: { x: 620, y: 150 },
                2: { x: 350, y: 340 },
                3: { x: 450, y: 50 },
                4: { x: 550, y: 340 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 24 },
                1: { u: 0, v: 2, w: 13 },
                2: { u: 0, v: 3, w: 13 },
                3: { u: 0, v: 4, w: 22 },
                4: { u: 1, v: 2, w: 22 },
                5: { u: 1, v: 3, w: 13 },
                6: { u: 1, v: 4, w: 13 },
                7: { u: 2, v: 3, w: 19 },
                8: { u: 2, v: 4, w: 14 },
                9: { u: 3, v: 4, w: 19 },
            };
    } else if (t == RAIL) {
        if (e == VL)
            return {
                0: { x: 50, y: 50 },
                1: { x: 200, y: 50 },
                2: { x: 350, y: 50 },
                3: { x: 500, y: 50 },
                4: { x: 650, y: 50 },
                5: { x: 50, y: 200 },
                6: { x: 200, y: 200 },
                7: { x: 350, y: 200 },
                8: { x: 500, y: 200 },
                9: { x: 650, y: 200 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 10 },
                1: { u: 1, v: 2, w: 10 },
                2: { u: 1, v: 6, w: 8 },
                3: { u: 1, v: 7, w: 13 },
                4: { u: 2, v: 3, w: 10 },
                5: { u: 2, v: 7, w: 8 },
                6: { u: 2, v: 8, w: 13 },
                7: { u: 3, v: 4, w: 10 },
                8: { u: 3, v: 8, w: 8 },
                9: { u: 5, v: 6, w: 10 },
                10: { u: 6, v: 7, w: 10 },
                11: { u: 7, v: 8, w: 10 },
                12: { u: 8, v: 9, w: 10 },
            };
    } else if (t == TESSELLATION) {
        if (e == VL)
            return {
                0: { x: 200, y: 50 },
                1: { x: 200, y: 170 },
                2: { x: 350, y: 110 },
                3: { x: 500, y: 170 },
                4: { x: 275, y: 290 },
                5: { x: 500, y: 290 },
                6: { x: 600, y: 50 },
                7: { x: 640, y: 240 },
                8: { x: 700, y: 120 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 8 },
                1: { u: 0, v: 2, w: 12 },
                2: { u: 1, v: 2, w: 13 },
                3: { u: 1, v: 3, w: 25 },
                4: { u: 1, v: 4, w: 9 },
                5: { u: 2, v: 3, w: 14 },
                6: { u: 2, v: 6, w: 21 },
                7: { u: 3, v: 4, w: 20 },
                8: { u: 3, v: 5, w: 8 },
                9: { u: 3, v: 6, w: 12 },
                10: { u: 3, v: 7, w: 12 },
                11: { u: 3, v: 8, w: 16 },
                12: { u: 4, v: 5, w: 19 },
                13: { u: 5, v: 7, w: 11 },
                14: { u: 6, v: 8, w: 11 },
                15: { u: 7, v: 8, w: 9 },
            };
    } else if (t == BELLMANFORD_KILLER) {
        if (e == VL)
            return {
                0: { x: 100, y: 50 },
                1: { x: 175, y: 50 },
                2: { x: 250, y: 50 },
                3: { x: 325, y: 50 },
                4: { x: 400, y: 50 },
                5: { x: 475, y: 50 },
                6: { x: 550, y: 50 },
            };
        if (e == EL)
            return {
                0: { u: 5, v: 6, w: 1 },
                1: { u: 4, v: 5, w: 2 },
                2: { u: 3, v: 4, w: 3 },
                3: { u: 2, v: 3, w: 4 },
                4: { u: 1, v: 2, w: 5 },
                5: { u: 0, v: 1, w: 6 },
            };
    } else if (t == DIJKSTRA_KILLER) {
        if (e == VL)
            return {
                0: { x: 100, y: 150 },
                1: { x: 150, y: 50 },
                2: { x: 200, y: 150 },
                3: { x: 250, y: 50 },
                4: { x: 300, y: 150 },
                5: { x: 350, y: 50 },
                6: { x: 400, y: 150 },
                7: { x: 450, y: 50 },
                8: { x: 500, y: 150 },
                9: { x: 550, y: 50 },
                10: { x: 600, y: 150 },
            };
        if (e == EL)
            return {
                0: { u: 1, v: 2, w: -32 },
                1: { u: 3, v: 4, w: -16 },
                2: { u: 5, v: 6, w: -8 },
                3: { u: 7, v: 8, w: -4 },
                4: { u: 9, v: 10, w: -2 },
                5: { u: 0, v: 2, w: 0 },
                6: { u: 2, v: 4, w: 0 },
                7: { u: 4, v: 6, w: 0 },
                8: { u: 6, v: 8, w: 0 },
                9: { u: 8, v: 10, w: 0 },
                10: { u: 8, v: 9, w: 1 },
                11: { u: 6, v: 7, w: 2 },
                12: { u: 4, v: 5, w: 4 },
                13: { u: 2, v: 3, w: 8 },
                14: { u: 0, v: 1, w: 16 },
            };
    } else if (t == DAG) {
        if (e == VL)
            return {
                0: { x: 280, y: 110 },
                1: { x: 400, y: 50 },
                2: { x: 200, y: 250 },
                3: { x: 500, y: 110 },
                4: { x: 500, y: 250 },
                5: { x: 600, y: 50 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 1 },
                1: { u: 0, v: 2, w: 7 },
                2: { u: 1, v: 3, w: 9 },
                3: { u: 1, v: 5, w: 15 },
                4: { u: 2, v: 4, w: 4 },
                5: { u: 3, v: 4, w: 10 },
                6: { u: 3, v: 5, w: 5 },
                7: { u: 4, v: 5, w: 3 },
            };
    } else if (t == FORDFULKERSON_KILLER) {
        if (e == VL)
            return {
                0: { x: 200, y: 150 },
                1: { x: 300, y: 250 },
                2: { x: 300, y: 50 },
                3: { x: 400, y: 150 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 8 },
                1: { u: 0, v: 2, w: 8 },
                2: { u: 1, v: 3, w: 8 },
                3: { u: 2, v: 3, w: 8 },
                4: { u: 2, v: 1, w: 1 },
            };
    } else if (t == DINIC_SHOWCASE) {
        if (e == VL)
            return {
                0: { x: 100, y: 100 },
                1: { x: 400, y: 50 },
                2: { x: 400, y: 150 },
                3: { x: 300, y: 200 },
                4: { x: 250, y: 250 },
                5: { x: 200, y: 300 },
                6: { x: 500, y: 200 },
                7: { x: 550, y: 250 },
                8: { x: 600, y: 300 },
                9: { x: 700, y: 100 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 9, w: 7 },
                1: { u: 0, v: 1, w: 5 },
                2: { u: 1, v: 9, w: 4 },
                3: { u: 0, v: 2, w: 8 },
                4: { u: 2, v: 9, w: 9 },
                5: { u: 0, v: 3, w: 3 },
                6: { u: 3, v: 6, w: 1 },
                7: { u: 6, v: 9, w: 1 },
                8: { u: 0, v: 4, w: 3 },
                9: { u: 4, v: 7, w: 4 },
                10: { u: 7, v: 9, w: 6 },
                11: { u: 0, v: 5, w: 7 },
                12: { u: 5, v: 8, w: 6 },
                13: { u: 8, v: 9, w: 5 },
            };
    } else if (t == MVC_U_TWO_APPROX_KILLER) {
        if (e == VL)
            return {
                0: { x: 100, y: 100, w: 2 },
                1: { x: 100, y: 200, w: 3 },
                2: { x: 100, y: 300, w: 4 },
                3: { x: 100, y: 400, w: 7 },
                4: { x: 200, y: 100, w: 1 },
                5: { x: 200, y: 200, w: 5 },
                6: { x: 200, y: 300, w: 6 },
                7: { x: 200, y: 400, w: 9 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 4, w: 1 },
                1: { u: 1, v: 5, w: 1 },
                2: { u: 2, v: 6, w: 1 },
                3: { u: 3, v: 7, w: 1 },
            };
    } else if (t == EXAMPLE_VERTEX_WEIGHTED_TREE) {
        if (e == VL)
            return {
                0: { x: 150, y: 100, w: 2 },
                1: { x: 100, y: 200, w: 9 },
                2: { x: 150, y: 200, w: 9 },
                3: { x: 200, y: 200, w: 9 },
                4: { x: 50, y: 300, w: 1 },
                5: { x: 100, y: 300, w: 1 },
                6: { x: 150, y: 300, w: 1 },
                7: { x: 200, y: 300, w: 1 },
                8: { x: 50, y: 400, w: 3 },
                9: { x: 100, y: 400, w: 2 },
                10: { x: 150, y: 400, w: 4 },
                11: { x: 150, y: 500, w: 5 },
                12: { x: 200, y: 500, w: 1 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1 },
                1: { u: 0, v: 2 },
                2: { u: 0, v: 3 },
                3: { u: 1, v: 4 },
                4: { u: 2, v: 5 },
                5: { u: 3, v: 6 },
                6: { u: 3, v: 7 },
                7: { u: 7, v: 8 },
                8: { u: 7, v: 9 },
                9: { u: 7, v: 10 },
                10: { u: 10, v: 11 },
                11: { u: 11, v: 12 },
            };
    } else if (t == MVC_W_TWO_APPROX_KILLER) {
        if (e == VL)
            return {
                0: { x: 200, y: 100, w: 5 },
                1: { x: 100, y: 200, w: 1 },
                2: { x: 150, y: 200, w: 2 },
                3: { x: 200, y: 200, w: 2 },
                4: { x: 250, y: 200, w: 3 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1 },
                1: { u: 0, v: 2 },
                2: { u: 0, v: 3 },
                3: { u: 0, v: 4 },
            };
    } else if (t == INTERESTING_BIPARTITE) {
        if (e == VL)
            return {
                0: { x: 100, y: 100, w: 2 },
                1: { x: 100, y: 200, w: 3 },
                2: { x: 100, y: 300, w: 4 },
                3: { x: 200, y: 100, w: 7 },
                4: { x: 200, y: 200, w: 1 },
                5: { x: 200, y: 300, w: 5 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 3, w: 1 },
                1: { u: 0, v: 4, w: 1 },
                2: { u: 2, v: 5, w: 1 },
                3: { u: 1, v: 5, w: 1 },
                4: { u: 0, v: 5, w: 1 },
            };
    } else if (t == LINEAR_CHAIN) {
        if (e == VL)
            return {
                0: { x: 100, y: 100, w: 3 },
                1: { x: 200, y: 100, w: 1 },
                2: { x: 300, y: 100, w: 4 },
                3: { x: 400, y: 100, w: 2 },
                4: { x: 500, y: 100, w: 9 },
                5: { x: 600, y: 100, w: 1 },
                6: { x: 700, y: 100, w: 2 },
                7: { x: 800, y: 100, w: 9 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 3 },
                1: { u: 1, v: 2, w: 1 },
                2: { u: 2, v: 3, w: 2 },
                3: { u: 3, v: 4, w: 4 },
                4: { u: 4, v: 5, w: 5 },
                5: { u: 5, v: 6, w: 9 },
                6: { u: 6, v: 7, w: 8 },
            };
    } else if (t == CS4234_SAMPLE) {
        if (e == VL)
            return {
                0: { x: 100, y: 100, w: 1 },
                1: { x: 200, y: 100, w: 1 },
                2: { x: 300, y: 100, w: 1 },
                3: { x: 400, y: 100, w: 1 },
                4: { x: 200, y: 200, w: 1 },
                5: { x: 300, y: 200, w: 1 },
                6: { x: 400, y: 200, w: 1 },
                7: { x: 400, y: 300, w: 1 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 1 },
                1: { u: 1, v: 2, w: 1 },
                2: { u: 1, v: 4, w: 1 },
                3: { u: 2, v: 3, w: 1 },
                4: { u: 2, v: 5, w: 1 },
                5: { u: 3, v: 6, w: 1 },
                6: { u: 4, v: 5, w: 1 },
                7: { u: 5, v: 6, w: 1 },
                8: { u: 6, v: 7, w: 1 },
            };
    } else if (t == K8) {
        if (e == VL)
            return {
                0: { x: 200, y: 100 },
                1: { x: 400, y: 100 },
                2: { x: 500, y: 250 },
                3: { x: 500, y: 400 },
                4: { x: 400, y: 550 },
                5: { x: 200, y: 550 },
                6: { x: 100, y: 400 },
                7: { x: 100, y: 250 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 13 },
                1: { u: 0, v: 2, w: 13 },
                2: { u: 0, v: 3, w: 12 },
                3: { u: 0, v: 4, w: 12 },
                4: { u: 0, v: 5, w: 13 },
                5: { u: 0, v: 6, w: 14 },
                6: { u: 0, v: 7, w: 12 },
                7: { u: 1, v: 2, w: 14 },
                8: { u: 1, v: 3, w: 14 },
                9: { u: 1, v: 4, w: 13 },
                10: { u: 1, v: 5, w: 14 },
                11: { u: 1, v: 6, w: 13 },
                12: { u: 1, v: 7, w: 12 },
                13: { u: 2, v: 3, w: 13 },
                14: { u: 2, v: 4, w: 13 },
                15: { u: 2, v: 5, w: 12 },
                16: { u: 2, v: 6, w: 12 },
                17: { u: 2, v: 7, w: 12 },
                18: { u: 3, v: 4, w: 13 },
                19: { u: 3, v: 5, w: 13 },
                20: { u: 3, v: 6, w: 13 },
                21: { u: 3, v: 7, w: 13 },
                22: { u: 4, v: 5, w: 13 },
                23: { u: 4, v: 6, w: 12 },
                24: { u: 4, v: 7, w: 13 },
                25: { u: 5, v: 6, w: 12 },
                26: { u: 5, v: 7, w: 12 },
                27: { u: 6, v: 7, w: 12 },
            };
    } else if (t == CS4234_TUTORIAL_THREE) {
        if (e == VL)
            return {
                0: { x: 60, y: 320 },
                1: { x: 340, y: 320 },
                2: { x: 340, y: 140 },
                3: { x: 240, y: 80 },
                4: { x: 120, y: 80 },
                5: { x: 360, y: 20 },
            };
        if (e == EL)
            return {
                0: { u: 1, v: 0, w: 28 },
                1: { u: 2, v: 0, w: 33 },
                2: { u: 3, v: 0, w: 30 },
                3: { u: 4, v: 0, w: 25 },
                4: { u: 0, v: 5, w: 42 },
                5: { u: 2, v: 1, w: 18 },
                6: { u: 3, v: 1, w: 26 },
                7: { u: 4, v: 1, w: 33 },
                8: { u: 5, v: 1, w: 30 },
                9: { u: 3, v: 2, w: 12 },
                10: { u: 4, v: 2, w: 23 },
                11: { u: 5, v: 2, w: 12 },
                12: { u: 4, v: 3, w: 12 },
                13: { u: 5, v: 3, w: 13 },
                14: { u: 5, v: 4, w: 25 },
            };
    } else if (t == WHEEL) {
        if (e == VL)
            return {
                0: { x: 200, y: 200 },
                1: { x: 200, y: 300 },
                2: { x: 100, y: 200 },
                3: { x: 200, y: 100 },
                4: { x: 300, y: 200 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 13 },
                1: { u: 0, v: 2, w: 13 },
                2: { u: 0, v: 3, w: 13 },
                3: { u: 0, v: 4, w: 13 },
                4: { u: 1, v: 2, w: 13 },
                5: { u: 2, v: 3, w: 13 },
                6: { u: 3, v: 4, w: 13 },
                7: { u: 4, v: 1, w: 13 },
            };
    } else if (t == K4) {
        if (e == VL)
            return {
                0: { x: 300, y: 200 },
                1: { x: 200, y: 400 },
                2: { x: 400, y: 400 },
                3: { x: 300, y: 340 },
            };
        if (e == EL)
            return {
                0: { u: 1, v: 2, w: 25 },
                1: { u: 1, v: 3, w: 13 },
                2: { u: 1, v: 0, w: 25 },
                3: { u: 2, v: 3, w: 13 },
                4: { u: 2, v: 0, w: 25 },
                5: { u: 3, v: 0, w: 13 },
            };
    } else if (t == HOUSE_OF_CARDS) {
        if (e == VL)
            return {
                0: { x: 250, y: 40 },
                1: { x: 200, y: 120 },
                2: { x: 300, y: 120 },
                3: { x: 150, y: 200 },
                4: { x: 250, y: 200 },
                5: { x: 350, y: 200 },
                6: { x: 100, y: 280 },
                7: { x: 200, y: 280 },
                8: { x: 300, y: 280 },
                9: { x: 400, y: 280 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 1, w: 1 },
                1: { u: 1, v: 3, w: 1 },
                2: { u: 3, v: 6, w: 1 },
                3: { u: 6, v: 7, w: 1 },
                4: { u: 7, v: 8, w: 1 },
                5: { u: 8, v: 9, w: 1 },
                6: { v: 5, u: 9, w: 1 },
                7: { v: 4, u: 5, w: 1 },
                8: { v: 3, u: 4, w: 1 },
                9: { v: 2, u: 4, w: 1 },
                10: { v: 1, u: 2, w: 1 },
                11: { u: 0, v: 2, w: 1 },
                12: { u: 2, v: 5, w: 1 },
                13: { u: 1, v: 4, w: 1 },
                14: { u: 4, v: 7, w: 1 },
                15: { u: 4, v: 8, w: 1 },
                16: { u: 3, v: 7, w: 1 },
                17: { u: 5, v: 8, w: 1 },
            };
    } else if (t == FMOD) {
        if (e == VL)
            return {
                7: { x: 100, y: 80 },
                0: { x: 220, y: 80 },
                1: { x: 340, y: 80 },
                6: { x: 220, y: 180 },
                2: { x: 340, y: 180 },
                3: { x: 460, y: 180 },
                4: { x: 340, y: 280 },
                5: { x: 460, y: 280 },
            };
        if (e == EL)
            return {
                0: { v: 7, u: 0, w: 1 },
                1: { v: 0, u: 1, w: 1 },
                2: { v: 1, u: 3, w: 1 },
                3: { v: 3, u: 2, w: 1 },
                4: { u: 3, v: 5, w: 1 },
                5: { u: 2, v: 1, w: 1 },
                6: { u: 2, v: 4, w: 1 },
                7: { v: 4, u: 5, w: 1 },
                8: { u: 4, v: 6, w: 1 },
                9: { v: 6, u: 0, w: 1 },
            };
    } else if (t == GREEDY_AUGMENTING_PATH_KILLER) {
        if (e == VL)
            return {
                0: { x: 100, y: 50, w: 2 },
                1: { x: 100, y: 100, w: 3 },
                2: { x: 100, y: 150, w: 4 },
                3: { x: 100, y: 200, w: 2 },
                4: { x: 100, y: 250, w: 3 },
                5: { x: 100, y: 300, w: 4 },
                6: { x: 100, y: 350, w: 3 },
                7: { x: 100, y: 400, w: 4 },
                8: { x: 200, y: 50, w: 7 },
                9: { x: 200, y: 100, w: 1 },
                10: { x: 200, y: 150, w: 5 },
                11: { x: 200, y: 200, w: 5 },
                12: { x: 200, y: 250, w: 5 },
                13: { x: 200, y: 300, w: 5 },
                14: { x: 200, y: 350, w: 5 },
                15: { x: 200, y: 400, w: 5 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 8, w: 1 },
                1: { u: 0, v: 9, w: 1 },
                2: { u: 1, v: 8, w: 1 },
                3: { u: 2, v: 10, w: 1 },
                4: { u: 2, v: 11, w: 1 },
                5: { u: 3, v: 10, w: 1 },
                6: { u: 4, v: 12, w: 1 },
                7: { u: 4, v: 13, w: 1 },
                8: { u: 5, v: 12, w: 1 },
                9: { u: 6, v: 14, w: 1 },
                10: { u: 6, v: 15, w: 1 },
                11: { u: 7, v: 14, w: 1 },
            };
    } else if (t == K55) {
        if (e == VL)
            return {
                0: { x: 100, y: 50, w: 2 },
                1: { x: 100, y: 100, w: 3 },
                2: { x: 100, y: 150, w: 4 },
                3: { x: 100, y: 200, w: 2 },
                4: { x: 100, y: 250, w: 3 },
                5: { x: 200, y: 50, w: 7 },
                6: { x: 200, y: 100, w: 1 },
                7: { x: 200, y: 150, w: 5 },
                8: { x: 200, y: 200, w: 5 },
                9: { x: 200, y: 250, w: 5 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 5, w: 1 },
                1: { u: 0, v: 6, w: 1 },
                2: { u: 0, v: 7, w: 1 },
                3: { u: 0, v: 8, w: 1 },
                4: { u: 0, v: 9, w: 1 },
                5: { u: 1, v: 5, w: 1 },
                6: { u: 1, v: 6, w: 1 },
                7: { u: 1, v: 7, w: 1 },
                8: { u: 1, v: 8, w: 1 },
                9: { u: 1, v: 9, w: 1 },
                10: { u: 2, v: 5, w: 1 },
                11: { u: 2, v: 6, w: 1 },
                12: { u: 2, v: 7, w: 1 },
                13: { u: 2, v: 8, w: 1 },
                14: { u: 2, v: 9, w: 1 },
                15: { u: 3, v: 5, w: 1 },
                16: { u: 3, v: 6, w: 1 },
                17: { u: 3, v: 7, w: 1 },
                18: { u: 3, v: 8, w: 1 },
                19: { u: 3, v: 9, w: 1 },
                20: { u: 4, v: 5, w: 1 },
                21: { u: 4, v: 6, w: 1 },
                22: { u: 4, v: 7, w: 1 },
                23: { u: 4, v: 8, w: 1 },
                24: { u: 4, v: 9, w: 1 },
            };
    } else if (t == K55_ALMOST) {
        if (e == VL)
            return {
                0: { x: 100, y: 50, w: 2 },
                1: { x: 100, y: 100, w: 3 },
                2: { x: 100, y: 150, w: 4 },
                3: { x: 100, y: 200, w: 2 },
                4: { x: 100, y: 250, w: 3 },
                5: { x: 200, y: 50, w: 7 },
                6: { x: 200, y: 100, w: 1 },
                7: { x: 200, y: 150, w: 5 },
                8: { x: 200, y: 200, w: 5 },
                9: { x: 200, y: 250, w: 5 },
            };
        if (e == EL)
            return {
                0: { u: 0, v: 5, w: 1 },
                1: { u: 0, v: 6, w: 1 },
                2: { u: 0, v: 8, w: 1 },
                3: { u: 0, v: 9, w: 1 },
                4: { u: 1, v: 6, w: 1 },
                5: { u: 1, v: 7, w: 1 },
                6: { u: 1, v: 8, w: 1 },
                7: { u: 2, v: 5, w: 1 },
                8: { u: 2, v: 6, w: 1 },
                9: { u: 2, v: 7, w: 1 },
                10: { u: 2, v: 8, w: 1 },
                11: { u: 2, v: 9, w: 1 },
                12: { u: 3, v: 5, w: 1 },
                13: { u: 3, v: 7, w: 1 },
                14: { u: 3, v: 8, w: 1 },
                15: { u: 3, v: 9, w: 1 },
                16: { u: 4, v: 5, w: 1 },
            };
    }
}
function deepCopy(t) {
    var e;
    if (t instanceof Array) {
        var r;
        for (e = [], r = 0; r < t.length; r++) e.push(deepCopy(t[r]));
    } else if (t instanceof Object) {
        e = {};
        for (keys in t) e[keys] = deepCopy(t[keys]);
    } else e = t;
    return e;
}
function GraphVisu(t, e, r, i, n, a) {
    function l() {
        (G = null), (M = null), (D = null);
    }
    function o() {
        _.selectAll("g").remove(),
            (b = _.append("svg:g").selectAll("path")),
            (R = _.append("svg:g").selectAll("g")),
            (O = _.append("svg:g").selectAll("text")),
            (R = R.data(P, function (t) {
                return t.id;aa
            })),
            R.selectAll("circle").style("fill", function (t) {
                return t === N
                    ? d3.rgb(m(t.id)).brighter().toString()
                    : m(t.id);
            });
        var t = R.enter().append("svg:g");
        t
            .append("svg:circle")
            .attr("class", "node")
            .attr("r", 16)
            .attr("cx", function (t) {
                return t.x;
            })
            .attr("cy", function (t) {
                return t.y;
            })
            .style("fill", function (t) {
                return t === N ? d3.rgb(255, 138, 39) : d3.rgb(238, 238, 238);
            })
            .on("mousedown", function (t) {
                d3.event.ctrlKey ||
                    ((G = t),
                    (N = G === N ? null : G),
                    (I = null),
                    A.style("marker-end", "url(#end-arrow)")
                        .classed("hidden", !1)
                        .attr(
                            "d",
                            "M" + G.x + "," + G.y + "L" + G.x + "," + G.y
                        ),
                    o());
            })
            .on("mouseup", function (t) {
                if (G) {
                    if (
                        (A.classed("hidden", !0).style("marker-end", ""),
                        (M = t) === G)
                    )
                        return void l();
                    var e, r;
                    (e = G), (r = M);
                    var i;
                    if (
                        !(i =
                            !1 === g
                                ? k.filter(function (t) {
                                      return t.source === e && t.target === r;
                                  })[0]
                                : k.filter(function (t) {
                                      return (
                                          (t.source === e && t.target === r) ||
                                          (t.source === r && t.target === e)
                                      );
                                  })[0])
                    )
                        if (!1 === v) {
                            var n = parseInt(
                                Math.sqrt(
                                    Math.pow(e.x - r.x, 2) +
                                        Math.pow(e.y - r.y, 2)
                                ) /
                                    100 +
                                    1
                            );
                            (i = { source: e, target: r, weight: n }),
                                k.push(i);
                        } else (i = { source: e, target: r }), k.push(i);
                    (I = i), (N = null), o();
                }
            }),
            t
                .append("svg:text")
                .attr("x", function (t) {
                    return t.x;
                })
                .attr("y", function (t) {
                    return t.y + 16 / 3;
                })
                .attr("class", "id")
                .text(function (t) {
                    return t.id;
                }),
            (b = b.data(k)),
            b.classed("selected", function (t) {
                return t === I;
            }),
            b
                .enter()
                .append("svg:path")
                .attr("class", "link")
                .classed("selected", function (t) {
                    return t === I;
                })
                .style("marker-end", function (t) {
                    if (!1 === g) return "url(#end-arrow)";
                })
                .attr("d", function (t) {
                    var e = t.target.x - t.source.x,
                        r = t.target.y - t.source.y,
                        i = Math.sqrt(e * e + r * r),
                        n = e / i,
                        a = r / i,
                        l = 17;
                    !0 === g && (l = 12);
                    var o = t.source.x + 12 * n,
                        f = t.source.y + 12 * a,
                        s = t.target.x - l * n,
                        x = t.target.y - l * a;
                    if (!0 === g) return "M" + o + "," + f + "L" + s + "," + x;
                    if (
                        k.filter(function (e) {
                            return (
                                e.source === t.target && e.target === t.source
                            );
                        })[0]
                    ) {
                        var d;
                        d = t.source.id < t.target.id ? 1 : 2;
                        var h = u(o, f, s, x, d).x,
                            w = u(o, f, s, x, d).y;
                        return (
                            "M" +
                            u(s, x, o, f, d).x +
                            "," +
                            u(s, x, o, f, d).y +
                            "L" +
                            h +
                            "," +
                            w
                        );
                    }
                    return "M" + o + "," + f + "L" + s + "," + x;
                })
                .on("mousedown", function (t) {
                    d3.event.ctrlKey ||
                        ((D = t), (I = D === I ? null : D), (N = null), o());
                }),
            !1 === v &&
                ((O = _.append("svg:g").selectAll("text")),
                (O = O.data(k)),
                O.enter()
                    .append("svg:text")
                    .attr("class", "weight")
                    .attr("x", function (t) {
                        var e;
                        e = t.source.id < t.target.id ? 1 : 2;
                        var r;
                        r = k.filter(function (e) {
                            return (
                                e.source === t.target && e.target === t.source
                            );
                        })[0];
                        var i = 0;
                        return (
                            r && (i = 2),
                            f(
                                t.source.x,
                                t.source.y,
                                t.target.x,
                                t.target.y,
                                e,
                                i
                            ).x
                        );
                    })
                    .attr("y", function (t) {
                        var e;
                        e = t.source.id < t.target.id ? 1 : 2;
                        var r;
                        r = k.filter(function (e) {
                            return (
                                e.source === t.target && e.target === t.source
                            );
                        })[0];
                        var i = 0;
                        return (
                            r && (i = 2),
                            f(
                                t.source.x,
                                t.source.y,
                                t.target.x,
                                t.target.y,
                                e,
                                i
                            ).y
                        );
                    })
                    .text(function (t) {
                        return t.weight;
                    })),
            !1 === y &&
                ((O = _.append("svg:g").selectAll("text")),
                (O = O.data(P)),
                O.enter()
                    .append("svg:text")
                    .attr("class", "weight")
                    .attr("x", function (t) {
                        return t.x;
                    })
                    .attr("y", function (t) {
                        return t.y + 30;
                    })
                    .text(function (t) {
                        return t.weight;
                    }));
        for (var e = -1, r = (P.length, k.length, []), i = 0; i < P.length; i++)
            P[i].id > e && (e = P[i].id);
        e++;
        for (var n = new Array(e), i = 0; i < e; i++) n[i] = !1;
        for (var i = 0; i < P.length; i++) n[P[i].id] = !0;
        for (var i = 0; i < e; i++) {
            r[i] = [];
            for (var a = 0; a < e; a++)
                !0 === n[i] && !0 === n[a] ? (r[i][a] = "0") : (r[i][a] = "x");
        }
        if (!0 === g)
            if (!0 === v)
                for (var i = 0; i < k.length; i++)
                    (r[k[i].source.id][k[i].target.id] = "1"),
                        (r[k[i].target.id][k[i].source.id] = "1");
            else
                for (var i = 0; i < k.length; i++)
                    (r[k[i].source.id][k[i].target.id] = k[
                        i
                    ].weight.toString()),
                        (r[k[i].target.id][k[i].source.id] = k[
                            i
                        ].weight.toString());
        else if (!0 === v)
            for (var i = 0; i < k.length; i++)
                r[k[i].source.id][k[i].target.id] = "1";
        else
            for (var i = 0; i < k.length; i++)
                r[k[i].source.id][k[i].target.id] = k[i].weight.toString();
        for (var s = '{"vl":{', i = 0; i < P.length; i++) {
            var x = '"' + i + '":',
                d = new Object();
            (d.x = P[i].x), (d.y = P[i].y), !1 === y && (d.w = P[i].weight);
            var h = JSON.stringify(d);
            (s += x + h), i !== P.length - 1 && (s += ",");
        }
        var w = '},"el":{';
        s = s.concat(w);
        for (var i = 0; i < k.length; i++) {
            for (
                var x = '"' + i + '":', d = new Object(), a = 0;
                a < P.length;
                a++
            )
                P[a].id == k[i].source.id && (d.u = a),
                    P[a].id == k[i].target.id && (d.v = a);
            (d.w = 1), !1 === v && (d.w = k[i].weight);
            var h = JSON.stringify(d);
            (s += x + h), i !== k.length - 1 && (s += ",");
        }
        (w = "}}"), (s = s.concat(w)), (JSONresult = s);
    }
    function u(t, e, r, i, n) {
        Math.sqrt(Math.pow(r - t, 2) + Math.pow(i - e, 2));
        if (t === r) return 1 === n ? { x: r - 4, y: i } : { x: r + 4, y: i };
        if (e === i) return 1 === n ? { x: r, y: i - 4 } : { x: r, y: i + 4 };
        var a = (i - e) / (r - t),
            l = -1 / a,
            o = i - l * r,
            u = Math.sqrt(Math.pow(r - t, 2) + Math.pow(i - e, 2));
        u = u * u + 16;
        var f = u,
            s = o - e,
            x = 1 + l * l,
            d = 2 * l * s - 2 * t,
            h = t * t + s * s - f,
            w = d * d - 4 * x * h;
        w = Math.sqrt(w);
        var c = (-d + w) / (2 * x),
            g = l * c + o,
            v = (-d - w) / (2 * x),
            y = l * v + o;
        return 2 === n ? { x: c, y: g } : { x: v, y: y };
    }
    function f(t, e, r, i, n, a) {
        var r =
                (Math.sqrt(Math.pow(r - t, 2) + Math.pow(i - e, 2)),
                (t + r) / 2),
            i = (e + i) / 2;
        if (t === r) return 2 === n ? { x: r + 16, y: i } : { x: r - 16, y: i };
        if (e === i) return 2 === n ? { x: r, y: i + 16 } : { x: r, y: i - 16 };
        var l = (i - e) / (r - t),
            o = -1 / l,
            u = i - o * r,
            f = Math.sqrt(Math.pow(r - t, 2) + Math.pow(i - e, 2)),
            s = 16;
        1 === a && (s = 50), 2 === a && (s = 18), (f = f * f + s * s);
        var x = f,
            d = u - e,
            h = 1 + o * o,
            w = 2 * o * d - 2 * t,
            c = t * t + d * d - x,
            g = w * w - 4 * h * c;
        g = Math.sqrt(g);
        var v = (-w + g) / (2 * h),
            y = o * v + u,
            p = (-w - g) / (2 * h),
            E = o * p + u;
        return 2 === n ? { x: v, y: y } : { x: p, y: E };
    }
    function s() {
        if ((_.classed("active", !0), !(d3.event.ctrlKey || G || D))) {
            var t = d3.mouse(this),
                e = { id: L };
            V[L]++;
            for (var r = 0; r < p; r++)
                if (0 === V[r]) {
                    L = r;
                    break;
                }
            (e.x = t[0]),
                (e.y = t[1]),
                !1 === y && (e.weight = 1),
                (e.x = parseInt(e.x) - (parseInt(e.x) % E)),
                (e.y = parseInt(e.y) - (parseInt(e.y) % E)),
                P.push(e),
                o();
        }
    }
    function x() {
        G &&
            (A.attr(
                "d",
                "M" +
                    G.x +
                    "," +
                    G.y +
                    "L" +
                    d3.mouse(this)[0] +
                    "," +
                    d3.mouse(this)[1]
            ),
            o());
    }
    function d() {
        G && A.classed("hidden", !0), _.classed("active", !1), l();
    }
    function h(t) {
        k.filter(function (e) {
            return e.source === t || e.target === t;
        }).map(function (t) {
            k.splice(k.indexOf(t), 1);
        });
    }
    function w() {
        if (
            ((F = d3.event.keyCode),
            17 === d3.event.keyCode && (R.call(C), _.classed("ctrl", !0)),
            N || I)
        )
            switch (d3.event.keyCode) {
                case 46:
                    if (N) {
                        P.splice(P.indexOf(N), 1), h(N), (V[N.id] = 0);
                        for (var t = 0; t < p; t++)
                            if (0 === V[t]) {
                                L = t;
                                break;
                            }
                    } else I && k.splice(k.indexOf(I), 1);
                    (I = null), (N = null), o();
                    break;
                case 13:
                    if (I && !1 === v) {
                        for (;;) {
                            var e = prompt("Enter new weight: (<= 99)");
                            if (e <= 99) break;
                        }
                        var r = k.indexOf(I);
                        k[r].weight = e;
                    } else if (N && !1 === y) {
                        for (;;) {
                            var e = prompt("Enter new weight: (<= 99)");
                            if (e <= 99) break;
                        }
                        var r = P.indexOf(N);
                        P[r].weight = e;
                    }
                    o();
            }
    }
    function c() {
        (F = -1),
            17 === d3.event.keyCode &&
                (R.on("mousedown.drag", null).on("touchstart.drag", null),
                _.classed("ctrl", !1));
    }
    var g = t,
        v = e,
        y = a,
        p = 100,
        E = 20,
        m = d3.scale.category10();
    d3.select("#drawgraph #viz").selectAll("svg").remove();
    for (
        var _ = d3
                .select("#drawgraph #viz")
                .append("svg")
                .attr("width", 640)
                .attr("height", 360),
            V = new Array(p),
            T = V.length;
        T >= 0;
        T--
    )
        V[T] = 0;
    var P, L;
    !0 === y
        ? ((P = [
              { id: 0, x: 100, y: 100 },
              { id: 1, x: 200, y: 200 },
              { id: 2, x: 300, y: 300 },
          ]),
          (L = 3))
        : ((P = [
              { id: 0, x: 100, y: 100, w: 3 },
              { id: 1, x: 200, y: 200, w: 5 },
              { id: 2, x: 300, y: 300, w: 7 },
          ]),
          (L = 3));
    var k;
    (k =
        !0 === v
            ? [
                  { source: P[0], target: P[1] },
                  { source: P[1], target: P[2] },
              ]
            : [
                  { source: P[0], target: P[1], weight: 2 },
                  { source: P[1], target: P[2], weight: 2 },
              ]),
        void 0 == i || void 0 == n ? ((k = []), (P = [])) : ((P = i), (k = n)),
        (L = 0),
        (L = P.length);
    for (var T = 0; T < P.length; T++) V[P[T].id]++;
    for (var T = 0; T < k.length; T++)
        for (var S = 0; S < P.length; S++)
            P[S].id === k[T].source.id && (k[T].source = P[S]),
                P[S].id === k[T].target.id && (k[T].target = P[S]);
    _.append("svg:defs")
        .append("svg:marker")
        .attr("id", "end-arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 6)
        .attr("markerWidth", 3)
        .attr("markerHeight", 3)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#000");
    var b,
        R,
        O,
        A = _.append("svg:path")
            .attr("class", "link dragline hidden")
            .attr("d", "M0,0L0,0"),
        N = null,
        I = null,
        D = null,
        G = null,
        M = null,
        F = -1,
        C = d3.behavior.drag().on("drag", function (t) {
            var e,
                r,
                i = d3.select(this).select("circle");
            i
                .attr("cx", function () {
                    return (e = d3.mouse($("svg")[0])[0]);
                })
                .attr("cy", function () {
                    return (r = d3.mouse($("svg")[0])[1]);
                }),
                (t.x = e),
                (t.y = r),
                (t.x = parseInt(t.x) - (parseInt(t.x) % E)),
                (t.y = parseInt(t.y) - (parseInt(t.y) % E)),
                o();
        });
    _.on("mousedown", s).on("mousemove", x).on("mouseup", d),
        d3.select(window).on("keydown", w).on("keyup", c),
        o();
}
function write(t, e, r) {
    void 0 === r && (r = "true");
    var i =
        '  <script>var JSONresult;</script>    <div id="main">      <div id="draw-status"><p>Status</p></div>      <div id="draw-warn"><p>No Warning</p></div>      <div id="draw-err"><p>No Error</p></div>      <div id="viz">        <svg onClick = "GraphVisu(' +
        t +
        "," +
        e +
        ",null,null,null," +
        r +
        '); " width="640" height="360"><defs><marker id="end-arrow" viewBox="0 -5 10 10" refX="6" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5" fill="#000"></path></marker></defs><path class="link dragline hidden" d="M0,0L0,0"></path><g><path class="link" d="M108.48528137423857,108.48528137423857L191.51471862576142,191.51471862576142"></path><path class="link" d="M208.48528137423858,208.48528137423858L291.5147186257614,291.5147186257614"></path></g><g><g><circle class="node" r="16" cx="100" cy="100" style="fill: rgb(238, 238, 238);"></circle><text x="100" y="105.33333333333333" class="id">0</text></g><g><circle class="node" r="16" cx="200" cy="200" style="fill: rgb(238, 238, 238);"></circle><text x="200" y="205.33333333333334" class="id">1</text></g><g><circle class="node" r="16" cx="300" cy="300" style="fill: rgb(238, 238, 238);"></circle><text x="300" y="305.3333333333333" class="id">2</text></g></g><g></g>        <text x = "250" y = "100"> &bull; Click on empty space to add vertex</text>        <text x = "250" y = "125"> &bull; Drag from vertex to vertex to add edge</text>        <text x = "250" y = "150"> &bull; Select + Delete to delete vertex/edge</text>        <text x = "250" y = "175"> &bull; Select Edge + Enter to change edge\'s weight</text>      </svg>    </div>    <div id="drawgraph-actions">      <p onclick=drawCancel()>Cancel</p>      <p onclick=GraphVisu(' +
        t +
        "," +
        e +
        "," +
        r +
        ')>Clear</p>      <p onclick=drawDone()>Done</p>      <form id="drawgraph-form">        \x3c!--<input type="checkbox" id="submit" name="submit" value="submit" checked="checked">Submit drawn graph to database for random graph and online quiz purposes        <br>--\x3e<input type="checkbox" id="copy" name="submit" value="submit" checked="checked">Copy JSON text to clipboard      </form>    </div>  ';
    $("#drawgraph").html(i), $("#copy").removeAttr("checked");
}
const OBJ_HIDDEN = -1,
    VERTEX_SHAPE_CIRCLE = "circle",
    VERTEX_SHAPE_RECT = "rect",
    VERTEX_DEFAULT = "default",
    VERTEX_NORMAL_BLUE = "normal_blue",
    VERTEX_NORMAL_GREEN = "normal_green",
    VERTEX_HIGHLIGHTED = "highlighted",
    VERTEX_HIGHLIGHTED_RECT = "highlighted_rect",
    VERTEX_TRAVERSED = "traversed",
    VERTEX_RESULT = "result",
    VERTEX_RESULT_RECT = "result_rect",
    VERTEX_RECT = "rect",
    VERTEX_BLUE_FILL = "blueFill",
    VERTEX_GREEN_FILL = "greenFill",
    VERTEX_GREY_FILL = "greyFill",
    VERTEX_PINK_FILL = "pinkFill",
    VERTEX_RED_FILL = "redFill",
    VERTEX_BLUE_OUTLINE = "blueOutline",
    VERTEX_GREEN_OUTLINE = "greenOutline",
    VERTEX_GREY_OUTLINE = "greyOutline",
    VERTEX_PINK_OUTLINE = "pinkOutline",
    VERTEX_RED_OUTLINE = "redOutline",
    EDGE_DEFAULT = "default",
    EDGE_HIGHLIGHTED = "highlighted",
    EDGE_TRAVERSED = "traversed",
    EDGE_BLUE = "blue",
    EDGE_GREEN = "green",
    EDGE_GREY = "grey",
    EDGE_PINK = "pink",
    EDGE_RED = "red",
    EDGE_TYPE_UDE = 0,
    EDGE_TYPE_DE = 1,
    EDGE_TYPE_BDE = 2,
    POLYGON_DEFAULT = "default",
    POLYGON_HIDDEN = "hidden",
    POLYGON_BLUE_FILL = "blueFill",
    POLYGON_GREEN_FILL = "greenFill",
    POLYGON_GREY_FILL = "greyFill",
    POLYGON_PINK_FILL = "pinkFill",
    POLYGON_RED_FILL = "redFill",
    POLYGON_BLUE_TRANSPARENT = "blueTransparent",
    POLYGON_GREEN_TRANSPARENT = "greenTransparent",
    POLYGON_GREY_TRANSPARENT = "greyTransparent",
    POLYGON_PINK_TRANSPARENT = "pinkTransparent",
    POLYGON_RED_TRANSPARENT = "redTransparent",
    NO_ITERATION = -1,
    NO_STATELIST = {},
    ANIMATION_PLAY = 1,
    ANIMATION_PAUSE = 0,
    ANIMATION_STOP = -1,
    UPDATE_FORWARD = !0,
    UPDATE_BACKWARD = !1,
    MODE_GET_ALL_SUBMITTED_GRAPHS_SUMMARY = 21,
    MODE_SUBMIT_GRAPH = 22,
    MODE_GET_SUBMITTED_GRAPH_BY_ID = 23,
    MODE_GET_ALL_GRAPH_TOPICS = 24,
    MODE_DELETE_SUBMITTED_GRAPH = 25,
    MODE_COMMIT_SUBMITTED_GRAPH = 26,
    MODE_ADD_SUBMITTED_GRAPH_RATING = 27,
    MODE_GET_RANDOM_SUBMITTED_GRAPH = 28,
    MODE_GET_ALL_COMMITTED_GRAPHS_SUMMARY = 29,
    MODE_DELETE_COMMITTED_GRAPH = 30,
    MAIN_SVG_WIDTH = 1e3,
    MAIN_SVG_HEIGHT = 600,
    PSEUDOCODE_SVG_WIDTH = 300,
    PSEUDOCODE_SVG_HEIGHT = 400,
    graphVertexProperties = {
        innerVertex: {
            r: 14,
            width: 30,
            height: 30,
            "stroke-width": 0,
            default: { fill: "#eee", stroke: "#fff" },
            "leaf-default": { fill: "#ff0", stroke: "#fff" },
            lazy: { fill: "#eee", stroke: "#fff" },
            "leaf-lazy": { fill: "#ff0", stroke: "#fff" },
            normal_blue: { fill: "#2ebbd1", stroke: "#fff" },
            highlighted: { fill: "#ff8a27", stroke: "#fff" },
            highlighted_rect: { fill: "#ff8a27", stroke: "#fff" },
            traversed: { fill: "#eee", stroke: "#fff" },
            result: { fill: "#f7e81e", stroke: "#fff" },
            rect: { fill: "#eee", stroke: "#fff" },
            result_rect: { fill: "#52bc69", stroke: "#fff" },
            greenFill: { fill: "#52bc69", stroke: "#fff" },
            greenOutline: { fill: "#eee", stroke: "#fff" },
            pinkFill: { fill: "#ed5a7d", stroke: "#fff" },
            pinkOutline: { fill: "#eee", stroke: "#fff" },
            blueFill: { fill: "#2ebbd1", stroke: "#fff" },
            blueOutline: { fill: "#eee", stroke: "#fff" },
            redFill: { fill: "#d9513c", stroke: "#fff" },
            redOutline: { fill: "#eee", stroke: "#fff" },
            greyFill: { fill: "#cccccc", stroke: "#fff" },
            greyOutline: { fill: "#eee", stroke: "#fff" },
        },
        outerVertex: {
            r: 16,
            width: 32,
            height: 32,
            "stroke-width": 2,
            default: { fill: "#333", stroke: "#333" },
            "leaf-default": { fill: "#333", stroke: "#333" },
            lazy: { fill: "#8b00ff", stroke: "#8b00ff" },
            "leaf-lazy": { fill: "#8b00ff", stroke: "#8b00ff" },
            normal_blue: { fill: "#2ebbd1", stroke: "#333" },
            highlighted: { fill: "#ff8a27", stroke: "#ff8a27" },
            highlighted_rect: { fill: "#ff8a27", stroke: "#333" },
            traversed: { fill: "#ff8a27", stroke: "#ff8a27" },
            result: { fill: "#f7e81e", stroke: "#f7e81e" },
            rect: { fill: "#333", stroke: "#333" },
            result_rect: { fill: "#52bc69", stroke: "#333" },
            greenFill: { fill: "#52bc69", stroke: "#52bc69" },
            greenOutline: { fill: "#52bc69", stroke: "#52bc69" },
            pinkFill: { fill: "#ed5a7d", stroke: "#ed5a7d" },
            pinkOutline: { fill: "#ed5a7d", stroke: "#ed5a7d" },
            blueFill: { fill: "#2ebbd1", stroke: "#2ebbd1" },
            blueOutline: { fill: "#2ebbd1", stroke: "#2ebbd1" },
            redFill: { fill: "#d9513c", stroke: "#d9513c" },
            redOutline: { fill: "#d9513c", stroke: "#d9513c" },
            greyFill: { fill: "#cccccc", stroke: "#cccccc" },
            greyOutline: { fill: "#cccccc", stroke: "#cccccc" },
        },
        text: {
            "font-size": 16,
            "font-sizes": [16, 16, 15, 13, 9, 9],
            default: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            "leaf-default": {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            lazy: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            "leaf-lazy": {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            normal_blue: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            highlighted: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            highlighted_rect: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left",
            },
            traversed: {
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            result: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            rect: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left",
            },
            result_rect: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left",
            },
            greenFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            greenOutline: {
                fill: "#52bc69",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            pinkFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            pinkOutline: {
                fill: "#ed5a7d",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            blueFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            blueOutline: {
                fill: "#2ebbd1",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            redFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            redOutline: {
                fill: "#d9513c",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            greyFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            greyOutline: {
                fill: "#cccccc",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
        },
        label: {
            "font-size": 16,
            default: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            lazy: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            normal_blue: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            highlighted: {
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            highlighted_rect: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left",
            },
            traversed: {
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            result: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            rect: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left",
            },
            result_rect: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left",
            },
            greenFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            greenOutline: {
                fill: "#52bc69",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            pinkFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            pinkOutline: {
                fill: "#ed5a7d",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            blueFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            blueOutline: {
                fill: "#2ebbd1",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            redFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            redOutline: {
                fill: "#d9513c",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            greyFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            greyOutline: {
                fill: "#cccccc",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
        },
    },
    graphEdgeProperties = {
        animateHighlightedPath: { stroke: "#ff8a27", "stroke-width": 10 },
        path: {
            "stroke-width": 3,
            default: { stroke: "#333" },
            highlighted: { stroke: "#ff8a27" },
            traversed: { stroke: "#ff8a27" },
            green: { stroke: "#52bc69" },
            pink: { stroke: "#ed5a7d" },
            blue: { stroke: "#2ebbd1" },
            red: { stroke: "#d9513c" },
            grey: { stroke: "#cccccc" },
        },
        weight: {
            "font-size": 16,
            default: {
                startOffset: "75%",
                dy: -5,
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            highlighted: {
                startOffset: "75%",
                dy: -5,
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            traversed: {
                startOffset: "75%",
                dy: -5,
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            green: {
                startOffset: "75%",
                dy: -5,
                fill: "#52bc69",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            pink: {
                startOffset: "75%",
                dy: -5,
                fill: "#ed5a7d",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            blue: {
                startOffset: "75%",
                dy: -5,
                fill: "#2ebbd1",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            red: {
                startOffset: "75%",
                dy: -5,
                fill: "#d9513c",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
            grey: {
                startOffset: "75%",
                dy: -5,
                fill: "#cccccc",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle",
            },
        },
    },
    graphPolygonProperties = {
        polygon: {
            "stroke-width": 0,
            default: { fill: "#eee", opacity: 1 },
            hidden: { fill: "#fff", opacity: 0 },
            greenFill: { fill: "#52bc69", opacity: 1 },
            greenTransparent: { fill: "#52bc69", opacity: 0.5 },
            pinkFill: { fill: "#ed5a7d", opacity: 1 },
            pinkTransparent: { fill: "#ed5a7d", opacity: 0.5 },
            blueFill: { fill: "#2ebbd1", opacity: 1 },
            blueTransparent: { fill: "#2ebbd1", opacity: 0.5 },
            redFill: { fill: "#d9513c", opacity: 1 },
            redTransparent: { fill: "#d9513c", opacity: 0.5 },
            greyFill: { fill: "#cccccc", opacity: 1 },
            greyTransparent: { fill: "#cccccc", opacity: 0.5 },
        },
    },
    ARROW_MARKER_WIDTH = 3,
    ARROW_MARKER_HEIGHT = 3,
    ARROW_REFX = 9,
    ARROW_FILL = "#333";
var ObjectPair = function (t, e) {
    (this.getFirst = function () {
        return t;
    }),
        (this.getSecond = function () {
            return e;
        }),
        (this.setFirst = function (e) {
            t = e;
        }),
        (this.setSecond = function (t) {
            e = t;
        });
};
ObjectPair.compare = function (t, e) {
    return t.getFirst() > e.getFirst()
        ? 1
        : t.getFirst() < e.getFirst()
        ? -1
        : t.getSecond() > e.getSecond()
        ? 1
        : t.getSecond() < e.getSecond()
        ? -1
        : 0;
};
var ObjectTriple = function (t, e, r) {
    (this.getFirst = function () {
        return t;
    }),
        (this.getSecond = function () {
            return e;
        }),
        (this.getThird = function () {
            return r;
        }),
        (this.setFirst = function (e) {
            t = e;
        }),
        (this.setSecond = function (t) {
            e = t;
        }),
        (this.setThird = function (t) {
            r = t;
        });
};
ObjectTriple.compare = function (t, e) {
    return t.getFirst() > e.getFirst()
        ? 1
        : t.getFirst() < e.getFirst()
        ? -1
        : t.getSecond() > e.getSecond()
        ? 1
        : t.getSecond() < e.getSecond()
        ? -1
        : t.getThird() > e.getThird()
        ? 1
        : t.getThird() < e.getThird()
        ? -1
        : 0;
};
var UfdsHelper = function () {
        var t = this,
            e = {};
        (this.insert = function (t) {
            if (null != e[t]) return !1;
            var r = {};
            (r.parent = t), (r.rank = 0), (e[t] = r);
        }),
            (this.findSet = function (t) {
                if (null == e[t]) return !1;
                for (var r = e[t].parent, i = t; r != i; )
                    (i = r), (r = e[i].parent);
                return (e[t].parent = r), r;
            }),
            (this.unionSet = function (r, i) {
                if (null == e[r] || null == e[i]) return !1;
                if (t.isSameSet(r, i)) return !0;
                var n = t.findSet(r),
                    a = t.findSet(i);
                e[n].rank > e[a].rank
                    ? ((e[n].parent = a), e[a].rank++)
                    : ((e[a].parent = n), e[n].rank++);
            }),
            (this.isSameSet = function (r, i) {
                return (
                    null != e[r] && null != e[i] && t.findSet(r) == t.findSet(i)
                );
            });
    },
    VL = 0,
    EL = 1,
    mst = -2,
    matrixx = -1,
    CP3_4_1 = 0,
    CP3_4_3 = 1,
    CP3_4_4 = 2,
    CP3_4_9 = 3,
    CP3_4_10 = 4,
    CP3_4_14 = 5,
    CP3_4_17 = 6,
    CP3_4_18 = 7,
    CP3_4_19 = 8,
    CP3_4_24 = 9,
    CP3_4_26_1 = 10,
    CP3_4_26_2 = 11,
    CP3_4_26_3 = 12,
    CP3_4_40 = 13,
    K5 = 14,
    RAIL = 15,
    TESSELLATION = 16,
    BELLMANFORD_KILLER = 17,
    DIJKSTRA_KILLER = 18,
    DAG = 19,
    FORDFULKERSON_KILLER = 20,
    DINIC_SHOWCASE = 21,
    MVC_U_TWO_APPROX_KILLER = 22,
    EXAMPLE_VERTEX_WEIGHTED_TREE = 23,
    MVC_W_TWO_APPROX_KILLER = 24,
    INTERESTING_BIPARTITE = 25,
    LINEAR_CHAIN = 26,
    CS4234_SAMPLE = 27,
    K4 = 28,
    K8 = 29,
    CS4234_TUTORIAL_THREE = 30,
    WHEEL = 31,
    HOUSE_OF_CARDS = 32,
    FMOD = 33,
    GREEDY_AUGMENTING_PATH_KILLER = 34,
    K55 = 35,
    K55_ALMOST = 36,
    mainSvg = d3
        .select("#viz")
        .append("svg")
        .attr("width", 1e3)
        .attr("height", 600),
    pseudocodeSvg = d3
        .select("#pseudocode")
        .append("svg")
        .attr("width", 300)
        .attr("height", 400),
    GraphWidget = function () {
        function t(t, e) {
            var r;
            for (r in t) {
                (null != a[r] && void 0 != a[r]) ||
                    n.addVertex(t[r].cx, t[r].cy, t[r].text, r, !1);
                var i = a[r];
                i.showVertex(),
                    t[r].state == OBJ_HIDDEN
                        ? i.hideVertex()
                        : null != t[r].state
                        ? i.stateVertex(t[r].state)
                        : i.stateVertex(VERTEX_DEFAULT),
                    i.moveVertex(t[r].cx, t[r].cy),
                    i.changeText(t[r].text),
                    null != t[r]["text-font-size"] &&
                        i.changeTextFontSize(t[r]["text-font-size"]),
                    null != t[r]["inner-r"] &&
                        null != t[r]["outer-r"] &&
                        i.changeRadius(t[r]["inner-r"], t[r]["outer-r"]),
                    null != t[r]["inner-w"] &&
                        null != t[r]["outer-w"] &&
                        i.changeWidth(t[r]["inner-w"], t[r]["outer-w"]),
                    null != t[r]["inner-h"] &&
                        null != t[r]["outer-h"] &&
                        i.changeHeight(t[r]["inner-h"], t[r]["outer-h"]),
                    null != t[r]["inner-stroke-width"] &&
                        null != t[r]["outer-stroke-width"] &&
                        i.changeStrokeWidth(
                            t[r]["inner-stroke-width"],
                            t[r]["outer-stroke-width"]
                        ),
                    null == t[r].extratext
                        ? i.changeExtraText("")
                        : i.changeExtraText(t[r].extratext),
                    i.redraw(e),
                    (u[r] = !0);
            }
            for (r in u)
                0 == u[r] && (a[r].hideVertex(), a[r].redraw(e), (u[r] = !0));
            for (r in u) u[r] = !1;
        }
        function e(t, e) {
            var r;
            try {
                for (r in t) {
                    (null != l[r] && void 0 != l[r]) ||
                        n.addEdge(
                            t[r].vertexA,
                            t[r].vertexB,
                            r,
                            t[r].type,
                            t[r].weight,
                            !1
                        );
                    var i = l[r];
                    i.showEdge(),
                        t[r].state == OBJ_HIDDEN
                            ? i.hideEdge()
                            : null != t[r].state
                            ? i.stateEdge(t[r].state)
                            : i.stateEdge(EDGE_DEFAULT),
                        i.hideWeight(),
                        t[r].state != OBJ_HIDDEN &&
                            null != t[r].displayWeight &&
                            t[r].displayWeight &&
                            i.showWeight(),
                        i.changeVertexA(a[t[r].vertexA]),
                        i.changeVertexB(a[t[r].vertexB]),
                        null == t[r].type && (t[r].type = EDGE_TYPE_UDE),
                        i.changeType(t[r].type),
                        null != t[r].weight && i.changeWeight(t[r].weight),
                        i.refreshPath(),
                        null != t[r].animateHighlighted &&
                        t[r].animateHighlighted
                            ? i.animateHighlighted(0.9 * e)
                            : i.redraw(e),
                        (f[r] = !0);
                }
                for (r in f)
                    0 == f[r] &&
                        (l[r].hideWeight(),
                        l[r].hideEdge(),
                        l[r].redraw(e),
                        (f[r] = !0));
                for (r in f) f[r] = !1;
            } catch (t) {}
        }
        function r(t, e) {
            var r;
            for (r in t) {
                (null != o[r] && void 0 != o[r]) ||
                    n.addPolygon(r, t[r].points, !1);
                var i = o[r];
                i.showPolygon(),
                    null != t[r].state
                        ? i.statePolygon(t[r].state)
                        : i.statePolygon(POLYGON_DEFAULT),
                    i.redraw(e),
                    (s[r] = !0);
            }
            for (r in s)
                0 == s[r] && (o[r].hidePolygon(), o[r].redraw(e), (s[r] = !0));
            for (r in s) s[r] = !1;
        }
        function i(i, n) {
            var a = Object.keys(d).length - 1;
            try {
                if (
                    ($("#progress-bar").slider("value", x),
                    $("#status p").html(d[x].status),
                    highlightLine(d[x].lineNo),
                    x == a)
                ) {
                    pause();
                    var l = $("#play img").attr("src");
                    l &&
                        $("#play img").attr(
                            "src",
                            l
                                .replace("/play.png", "/replay.png")
                                .replace("/pause.png", "/replay.png")
                        ),
                        $("#play img")
                            .attr("alt", "replay")
                            .attr("title", "replay");
                } else {
                    var l = $("#play img").attr("src");
                    l &&
                        $("#play img").attr(
                            "src",
                            l
                                .replace("/replay.png", "/play.png")
                                .replace("/pause.png", "/play.png")
                        ),
                        $("#play img")
                            .attr("alt", "play")
                            .attr("title", "play");
                }
            } catch (t) {}
            t(i.vl, n), e(i.el, n), r(i.pl, n);
        }
        var n = this,
            a = {},
            l = {},
            o = {},
            u = {},
            f = {},
            s = {},
            x = -1,
            d = NO_STATELIST,
            h = -1,
            w = 500;
        (this.clearAll = function () {
            mainSvg.select("#polygon").empty() &&
                (polygonSvg = mainSvg.append("g").attr("id", "polygon")),
                mainSvg.select("#edge").empty() &&
                    (edgeSvg = mainSvg.append("g").attr("id", "edge")),
                mainSvg.select("#vertex").empty() &&
                    (vertexSvg = mainSvg.append("g").attr("id", "vertex")),
                mainSvg.select("#vertexText").empty() &&
                    (vertexTextSvg = mainSvg
                        .append("g")
                        .attr("id", "vertexText")),
                mainSvg.select("#edgeWeight").empty() &&
                    (edgeWeightSvg = mainSvg
                        .append("g")
                        .attr("id", "edgeWeight")),
                mainSvg.select("#edgeWeightPath").empty() &&
                    (edgeWeightPathSvg = mainSvg
                        .append("g")
                        .attr("id", "edgeWeightPath")),
                mainSvg.select("#marker").empty() &&
                    (markerSvg = mainSvg.append("g").attr("id", "marker"));
        }),
            n.clearAll(),
            (this.addVertex = function (t, e, r, i, n, l) {
                0 != n && (n = !0);
                var o = new GraphVertexWidget(t, e, "circle", r, i);
                "" != l && o.changeExtraText(l),
                    (a[i] = o),
                    (u[i] = !1),
                    1 == n && (a[i].showVertex(), a[i].redraw()),
                    setTimeout(function () {
                        document.body.style.zoom = "100.1%";
                    }, 500),
                    setTimeout(function () {
                        document.body.style.zoom = "100%";
                    }, 600);
            }),
            (this.addRectVertex = function (t, e, r, i, n, l) {
                0 != n && (n = !0), void 0 === l && (l = "rect");
                var o = new GraphVertexWidget(t, e, l, r, i);
                (a[i] = o),
                    (u[i] = !1),
                    1 == n && (a[i].showVertex(), a[i].redraw()),
                    setTimeout(function () {
                        document.body.style.zoom = "100.1%";
                    }, 500),
                    setTimeout(function () {
                        document.body.style.zoom = "100%";
                    }, 600);
            }),
            (this.addEdge = function (t, e, r, i, n, o, u) {
                try {
                    0 != o && (o = !0),
                        1 != u && (u = !1),
                        (null == i || isNaN(i)) && (i = EDGE_TYPE_UDE),
                        (null == n || isNaN(n)) && (n = 1);
                    var s = a[t],
                        x = a[e],
                        d = new GraphEdgeWidget(s, x, r, i, n);
                    (l[r] = d),
                        (f[r] = !1),
                        a[t].addEdge(d),
                        a[e].addEdge(d),
                        1 == o &&
                            (l[r].showEdge(),
                            1 == u && l[r].showWeight(),
                            l[r].redraw()),
                        setTimeout(function () {
                            document.body.style.zoom = "100.1%";
                        }, 500),
                        setTimeout(function () {
                            document.body.style.zoom = "100%";
                        }, 600);
                } catch (t) {}
            }),
            (this.removeEdge = function (t) {
                null != l[t] &&
                    void 0 != l[t] &&
                    (l[t].removeEdge(),
                    delete l[t],
                    delete f[t],
                    setTimeout(function () {
                        document.body.style.zoom = "100.1%";
                    }, 500),
                    setTimeout(function () {
                        document.body.style.zoom = "100%";
                    }, 600));
            }),
            (this.removeVertex = function (t) {
                null != a[t] &&
                    void 0 != u[t] &&
                    (a[t].removeVertex(),
                    delete a[t],
                    delete u[t],
                    setTimeout(function () {
                        document.body.style.zoom = "100.1%";
                    }, 500),
                    setTimeout(function () {
                        document.body.style.zoom = "100%";
                    }, 600));
            }),
            (this.addPolygon = function (t, e, r) {
                0 != r && (r = !0);
                var i = new GraphPolygonWidget(t, e);
                (o[t] = i),
                    (s[t] = !1),
                    1 == r && (o[t].showPolygon(), o[t].redraw());
            }),
            (this.removePolygon = function (t) {
                null != o[t] &&
                    void 0 != s[t] &&
                    (o[t].removePolygon(), delete o[t], delete s[t]);
            }),
            (this.updateGraph = function (t, e) {
                (null == e || isNaN(e)) && (e = w),
                    i(t, e),
                    setTimeout(function () {
                        document.body.style.zoom = "100.1%";
                    }, 500),
                    setTimeout(function () {
                        document.body.style.zoom = "100%";
                    }, 600);
            }),
            (this.startAnimation = function (t, e) {
                null != t && (d = t), (x = 0), n.play(e);
            }),
            (this.animate = function (t) {
                x >= d.length && -1 != h && (h = 0),
                    x == d.length - 1 && "function" == typeof t && t(),
                    0 != h &&
                        -1 != h &&
                        (n.next(w),
                        setTimeout(function () {
                            n.animate(t);
                        }, w));
            }),
            (this.play = function (t) {
                x < 0 && (x = 0),
                    -1 == h
                        ? ((h = 1),
                          i(d[x], w),
                          setTimeout(function () {
                              n.animate(t);
                          }, w))
                        : ((h = 1), n.animate(t));
            }),
            (this.pause = function () {
                h = 0;
            }),
            (this.stop = function () {
                n.jumpToIteration(d.length - 1, 0),
                    (x = d.length - 1),
                    (h = -1);
                var t,
                    e = d[x].vl,
                    r = d[x].el;
                for (t in r) f[t] = !0;
                for (t in f) 0 == f[t] && n.removeEdge(t);
                for (t in e) u[t] = !0;
                for (t in u) 0 == u[t] && n.removeVertex(t);
                for (t in f) f[t] = !1;
                for (t in u) u[t] = !1;
                (d = NO_STATELIST), (x = -1);
            }),
            (this.next = function (t) {
                if ((x < 0 && (x = 0), ++x >= d.length))
                    return void (x = d.length - 1);
                i(d[x], t);
            }),
            (this.previous = function (t) {
                x >= d.length && (x = d.length - 1), --x < 0 || i(d[x], t);
            }),
            (this.forceNext = function (t) {
                n.pause(), n.next(t);
            }),
            (this.forcePrevious = function (t) {
                n.pause(), n.previous(t);
            }),
            (this.jumpToIteration = function (t, e) {
                n.pause(),
                    (x = t),
                    x >= d.length && (x = d.length - 1),
                    x < 0 && (x = 0),
                    i(d[x], e);
            }),
            (this.replay = function () {
                n.jumpToIteration(0, 0),
                    setTimeout(function () {
                        n.play();
                    }, 500);
            }),
            (this.getCurrentIteration = function () {
                return x;
            }),
            (this.getTotalIteration = function () {
                return Object.keys(d).length;
            }),
            (this.getAnimationDuration = function () {
                return w;
            }),
            (this.getCurrentState = function () {
                return d[x];
            }),
            (this.setAnimationDuration = function (t) {
                w = t;
            }),
            (this.removeAll = function () {
                var t;
                for (t in l) l[t].removeEdge();
                for (t in a) a[t].removeVertex();
                for (t in o) o[t].removePolygon();
                (l = {}), (a = {}), (o = {}), (u = {}), (f = {}), (s = {});
            });
    },
    GraphVertexWidget = function (t, e, r, i, n) {
        function a(t) {
            var e = t.toString().length;
            return (
                e >= 6 && (e = 6),
                0 === e && (e = 1),
                graphVertexProperties.text["font-sizes"][e - 1]
            );
        }
        function l(t) {
            (null == t || isNaN(t)) && (t = d),
                t <= 0 && (t = 1),
                o
                    .transition()
                    .duration(t)
                    .attr("cx", w.innerVertex.cx)
                    .attr("cy", w.innerVertex.cy)
                    .attr("x", w.innerVertex.x)
                    .attr("y", w.innerVertex.y)
                    .attr("fill", w.innerVertex.fill)
                    .attr("r", w.innerVertex.r)
                    .attr("width", w.innerVertex.width)
                    .attr("height", w.innerVertex.height)
                    .attr("stroke", w.innerVertex.stroke)
                    .attr("stroke-width", w.innerVertex["stroke-width"]),
                u
                    .transition()
                    .duration(t)
                    .attr("cx", w.outerVertex.cx)
                    .attr("cy", w.outerVertex.cy)
                    .attr("x", w.outerVertex.x)
                    .attr("y", w.outerVertex.y)
                    .attr("fill", w.outerVertex.fill)
                    .attr("r", w.outerVertex.r)
                    .attr("width", w.outerVertex.width)
                    .attr("height", w.outerVertex.height)
                    .attr("stroke", w.outerVertex.stroke)
                    .attr("stroke-width", w.outerVertex["stroke-width"]),
                f
                    .transition()
                    .duration(t)
                    .attr("x", w.text.x)
                    .attr("y", w.text.y)
                    .attr("fill", w.text.fill)
                    .attr("font-family", w.text["font-family"])
                    .attr("font-size", w.text["font-size"])
                    .attr("font-weight", w.text["font-weight"])
                    .attr("text-anchor", w.text["text-anchor"])
                    .text(function () {
                        return w.text.text;
                    }),
                s
                    .transition()
                    .duration(t)
                    .attr("x", w.extratext.x)
                    .attr("y", w.extratext.y)
                    .attr("fill", w.extratext.fill)
                    .attr("font-family", w.extratext["font-family"])
                    .attr("font-size", w.extratext["font-size"])
                    .attr("font-weight", w.extratext["font-weight"])
                    .attr("text-anchor", w.extratext["text-anchor"])
                    .text(function () {
                        return w.extratext.text;
                    });
        }
        var o,
            u,
            f,
            s,
            x,
            d = 250,
            h = a(i) / 3,
            w = {
                innerVertex: {
                    class: null,
                    cx: null,
                    cy: null,
                    x: null,
                    y: null,
                    fill: null,
                    r: null,
                    width: null,
                    height: null,
                    stroke: null,
                    "stroke-width": null,
                },
                outerVertex: {
                    class: null,
                    cx: null,
                    cy: null,
                    x: null,
                    y: null,
                    fill: null,
                    r: null,
                    width: null,
                    height: null,
                    stroke: null,
                    "stroke-width": null,
                },
                text: {
                    class: null,
                    x: null,
                    y: null,
                    fill: null,
                    "font-family": null,
                    "font-weight": null,
                    "font-size": null,
                    "text-anchor": null,
                    text: null,
                },
                extratext: {
                    class: null,
                    x: null,
                    y: null,
                    fill: null,
                    "font-family": null,
                    "font-weight": null,
                    "font-size": null,
                    "text-anchor": null,
                    text: null,
                },
            },
            c = {};
        !(function () {
            var a = r;
            "rect_long" == r && (a = "rect"),
                (u = vertexSvg.append(a)),
                (o = vertexSvg.append(a)),
                (f = vertexTextSvg.append("text")),
                (s = vertexTextSvg.append("text")),
                (w.innerVertex.class = "v" + n),
                (w.innerVertex.cx = t),
                (w.innerVertex.cy = e),
                (w.innerVertex.x =
                    t - graphVertexProperties.innerVertex.width / 2),
                (w.innerVertex.y =
                    e - graphVertexProperties.innerVertex.height / 2),
                (w.innerVertex.fill =
                    graphVertexProperties.innerVertex.default.fill),
                (w.innerVertex.r = 0),
                (w.innerVertex.width = 0),
                (w.innerVertex.height = 0),
                (w.innerVertex.stroke =
                    graphVertexProperties.innerVertex.default.stroke),
                (w.innerVertex["stroke-width"] = 0),
                (w.outerVertex.class = "v" + n),
                (w.outerVertex.cx = t),
                (w.outerVertex.cy = e),
                (w.outerVertex.x =
                    t - graphVertexProperties.outerVertex.width / 2),
                (w.outerVertex.y =
                    e - graphVertexProperties.outerVertex.height / 2),
                (w.outerVertex.fill =
                    graphVertexProperties.outerVertex.default.fill),
                (w.outerVertex.r = 0),
                (w.innerVertex.width = 0),
                (w.innerVertex.height = 0),
                (w.outerVertex.stroke =
                    graphVertexProperties.outerVertex.default.stroke),
                (w.outerVertex["stroke-width"] = 0),
                (w.text.class = "v" + n),
                (w.text.x = t),
                (w.text.y = e + h),
                (w.text.fill = graphVertexProperties.text.default.fill),
                (w.text["font-family"] =
                    graphVertexProperties.text.default["font-family"]),
                (w.text["font-size"] = 0),
                (w.text["font-weight"] =
                    graphVertexProperties.text.default["font-weight"]),
                (w.text["text-anchor"] =
                    graphVertexProperties.text.default["text-anchor"]),
                "rect_long" == r && (w.text["text-anchor"] = "left"),
                (w.text.text = i),
                (w.extratext.class = "v" + n),
                (w.extratext.x = t),
                (w.extratext.y = e + h + 26),
                (w.extratext.fill = "red"),
                (w.extratext["font-family"] =
                    graphVertexProperties.text.default["font-family"]),
                (w.extratext["font-size"] = 0),
                (w.extratext["font-weight"] =
                    graphVertexProperties.text.default["font-weight"]),
                (w.extratext["text-anchor"] =
                    graphVertexProperties.text.default["text-anchor"]),
                "rect_long" == r && (w.extratext["text-anchor"] = "left"),
                (w.extratext.text = ""),
                o.attr("class", w.innerVertex.class),
                u.attr("class", w.outerVertex.class),
                f.attr("class", w.text.class),
                s.attr("class", w.extratext.class),
                o
                    .attr("cx", w.innerVertex.cx)
                    .attr("cy", w.innerVertex.cy)
                    .attr("x", w.innerVertex.x)
                    .attr("y", w.innerVertex.y)
                    .attr("fill", w.innerVertex.fill)
                    .attr("r", w.innerVertex.r)
                    .attr("width", w.innerVertex.width)
                    .attr("height", w.innerVertex.height)
                    .attr("stroke", w.innerVertex.stroke)
                    .attr("stroke-width", w.innerVertex["stroke-width"]),
                u
                    .attr("cx", w.outerVertex.cx)
                    .attr("cy", w.outerVertex.cy)
                    .attr("x", w.outerVertex.x)
                    .attr("y", w.outerVertex.y)
                    .attr("fill", w.outerVertex.fill)
                    .attr("r", w.outerVertex.r)
                    .attr("width", w.outerVertex.width)
                    .attr("height", w.outerVertex.height)
                    .attr("stroke", w.outerVertex.stroke)
                    .attr("stroke-width", w.outerVertex["stroke-width"]),
                f
                    .attr("x", w.text.x)
                    .attr("y", w.text.y)
                    .attr("fill", w.text.fill)
                    .attr("font-family", w.text["font-family"])
                    .attr("font-size", w.text["font-size"])
                    .attr("font-weight", w.text["font-weight"])
                    .attr("text-anchor", w.text["text-anchor"])
                    .text(function () {
                        return w.text.text;
                    }),
                s
                    .attr("x", w.extratext.x)
                    .attr("y", w.extratext.y)
                    .attr("fill", w.extratext.fill)
                    .attr("font-family", w.extratext["font-family"])
                    .attr("font-size", w.extratext["font-size"])
                    .attr("font-weight", w.extratext["font-weight"])
                    .attr("text-anchor", w.extratext["text-anchor"])
                    .text(function () {
                        return w.extratext.text;
                    });
        })(),
            (this.redraw = function (t) {
                l(t);
            }),
            (this.showVertex = function () {
                (w.outerVertex.r = graphVertexProperties.outerVertex.r),
                    (w.outerVertex.width =
                        graphVertexProperties.outerVertex.width),
                    (w.outerVertex.height =
                        graphVertexProperties.outerVertex.height),
                    (w.outerVertex["stroke-width"] =
                        graphVertexProperties.outerVertex["stroke-width"]),
                    (w.innerVertex.r = graphVertexProperties.innerVertex.r),
                    (w.innerVertex.width =
                        graphVertexProperties.innerVertex.width),
                    (w.innerVertex.height =
                        graphVertexProperties.innerVertex.height),
                    (w.innerVertex["stroke-width"] =
                        graphVertexProperties.innerVertex["stroke-width"]),
                    (w.text["font-size"] = a(i)),
                    (w.extratext["font-size"] =
                        graphVertexProperties.text["font-size"]),
                    "rect_long" == r
                        ? ((w.outerVertex.width = 200),
                          (w.innerVertex.width = 198))
                        : "rect" == r &&
                          ((w.outerVertex.width = 80),
                          (w.innerVertex.width = 78));
            }),
            (this.hideVertex = function () {
                (w.outerVertex.r = 0),
                    (w.outerVertex.width = 0),
                    (w.outerVertex.height = 0),
                    (w.outerVertex["stroke-width"] = 0),
                    (w.innerVertex.r = 0),
                    (w.innerVertex.width = 0),
                    (w.innerVertex.height = 0),
                    (w.innerVertex["stroke-width"] = 0),
                    (w.text["font-size"] = 0),
                    (w.extratext["font-size"] = 0);
            }),
            (this.moveVertex = function (t, e) {
                (w.outerVertex.cx = t),
                    (w.outerVertex.cy = e),
                    (w.outerVertex.x =
                        t - graphVertexProperties.outerVertex.width / 2),
                    (w.outerVertex.y =
                        e - graphVertexProperties.outerVertex.height / 2),
                    (w.innerVertex.cx = t),
                    (w.innerVertex.cy = e),
                    (w.innerVertex.x =
                        t - graphVertexProperties.innerVertex.width / 2),
                    (w.innerVertex.y =
                        e - graphVertexProperties.innerVertex.height / 2),
                    (w.text.x = t),
                    (w.text.y = e + h),
                    (w.extratext.x = t),
                    (w.extratext.y = e + h + 26);
                var r;
                for (r in c) c[r].refreshPath();
            }),
            (this.changeText = function (t) {
                (i = t), (w.text.text = t), (w.text["font-size"] = a(t));
            }),
            (this.changeExtraText = function (t) {
                (x = t), (w.extratext.text = t);
            }),
            (this.changeTextFontSize = function (t) {
                null == newTextSize ||
                    isNaN(newTextSize) ||
                    ((w.text["font-size"] = newTextSize),
                    (w.extratext["font-size"] = newTextSize));
            }),
            (this.changeRadius = function (t, e) {
                null == t ||
                    isNaN(t) ||
                    ((w.innerVertex.r = t),
                    null == e || isNaN(e) || (w.outerVertex.r = e));
            }),
            (this.changeWidth = function (t, e) {
                null == t ||
                    isNaN(t) ||
                    ((w.innerVertex.width = t),
                    null == e || isNaN(e) || (w.outerVertex.width = e));
            }),
            (this.changeHeight = function (t, e) {
                null == t ||
                    isNaN(t) ||
                    ((w.innerVertex.height = t),
                    null == e || isNaN(e) || (w.outerVertex.height = e));
            }),
            (this.changeStrokeWidth = function (t, e) {
                null == t ||
                    isNaN(t) ||
                    ((w.innerVertex["stroke-width"] = t),
                    null == e ||
                        isNaN(e) ||
                        (w.outerVertex["stroke-width"] = e));
            }),
            (this.removeVertex = function () {
                u.remove(), o.remove(), f.remove(), s.remove();
            }),
            (this.stateVertex = function (t) {
                var e;
                for (e in graphVertexProperties.innerVertex[t])
                    w.innerVertex[e] = graphVertexProperties.innerVertex[t][e];
                for (e in graphVertexProperties.outerVertex[t])
                    w.outerVertex[e] = graphVertexProperties.outerVertex[t][e];
                for (e in graphVertexProperties.text[t])
                    w.text[e] = graphVertexProperties.text[t][e];
            }),
            (this.getAttributes = function () {
                return deepCopy(w);
            }),
            (this.getClassNumber = function () {
                return n;
            }),
            (this.addEdge = function (t) {
                c[t.getAttributes().id] = t;
            }),
            (this.removeEdge = function (t) {
                null != c[t.getAttributes().id] &&
                    void 0 != c[t.getAttributes().id] &&
                    delete c[t.getAttributes().id];
            }),
            (this.getEdge = function () {
                var t,
                    e = [];
                for (t in c) e.push(c[t]);
                return e;
            });
    },
    GraphEdgeWidget = function (t, e, r, i, n) {
        function a() {
            if (t) return parseFloat(t.getAttributes().outerVertex.cx);
        }
        function l() {
            if (t) return parseFloat(t.getAttributes().outerVertex.cy);
        }
        function o() {
            if (t) return parseFloat(t.getAttributes().outerVertex.r);
        }
        function u() {
            if (t) return parseFloat(e.getAttributes().outerVertex.cx);
        }
        function f() {
            if (t) return parseFloat(e.getAttributes().outerVertex.cy);
        }
        function s() {
            if (t) return parseFloat(e.getAttributes().outerVertex.r);
        }
        function x() {
            for (
                var t = a(),
                    e = l(),
                    r = u(),
                    i = f(),
                    n = d(t, e, r, i, o(), t, e),
                    x = d(t, e, r, i, s(), r, i),
                    h = 5e3,
                    w = 0,
                    c = 0,
                    g = 1;
                g <= 3;
                g += 2
            )
                for (var v = 1; v <= 3; v += 2) {
                    var y = Math.sqrt(
                        (n[g - 1] - x[v - 1]) * (n[g - 1] - x[v - 1]) +
                            (n[g] - x[v]) * (n[g] - x[v])
                    );
                    y < h && ((h = y), (w = g), (c = v));
                }
            return [
                { x: n[w - 1], y: n[w] },
                { x: x[c - 1], y: x[c] },
            ];
        }
        function d(t, e, r, i, n, a, l) {
            var o = r - t,
                u = i - e,
                f = a - t,
                s = l - e,
                x = o * o + u * u,
                d = o * f + u * s,
                h = f * f + s * s - n * n,
                w = d / x,
                c = h / x,
                g = w * w - c,
                v = Math.sqrt(g),
                y = -w + v,
                p = -w - v,
                E = t - o * y,
                m = e - u * y,
                _ = t - o * p,
                V = e - u * p,
                T = new Array();
            return (T[0] = E), (T[1] = m), (T[2] = _), (T[3] = V), T;
        }
        function h(t) {
            (null == t || isNaN(t)) && (t = E),
                t <= 0 && (t = 1),
                c.attr("class", T.path.class),
                c
                    .transition()
                    .duration(t)
                    .attr("d", T.path.d)
                    .attr("stroke", T.path.stroke)
                    .attr("stroke-width", T.path["stroke-width"])
                    .style("marker-start", function () {
                        return T.path.d == V
                            ? null
                            : "bde" == T.path.class
                            ? "url(#backwardArrow)"
                            : null;
                    })
                    .style("marker-end", function () {
                        return T.path.d == V
                            ? null
                            : "de" == T.path.class || "bde" == T.path.class
                            ? "url(#arrow)"
                            : null;
                    }),
                g
                    .transition()
                    .duration(t)
                    .attr("fill", T.weight.fill)
                    .attr("font-family", T.weight["font-family"])
                    .attr("font-size", T.weight["font-size"])
                    .attr("font-weight", T.weight["font-weight"])
                    .attr("text-anchor", T.weight["text-anchor"])
                    .attr("text-decoration", "underline"),
                y
                    .transition()
                    .duration(t)
                    .text(function () {
                        return T.weight.text;
                    });
        }
        function w() {
            (_ = m(x())), (V = m([x()[0], x()[0]]));
        }
        !(function () {
            markerSvg.select("#arrow").empty() &&
                markerSvg
                    .append("marker")
                    .attr("id", "arrow")
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", ARROW_REFX)
                    .attr("markerWidth", ARROW_MARKER_WIDTH)
                    .attr("markerHeight", ARROW_MARKER_HEIGHT)
                    .attr("orient", "auto")
                    .append("path")
                    .attr("d", "M0,-5 L10,0 L0,5")
                    .attr("fill", ARROW_FILL),
                markerSvg.select("#backwardArrow").empty() &&
                    markerSvg
                        .append("marker")
                        .attr("id", "backwardArrow")
                        .attr("viewBox", "-10 -5 10 10")
                        .attr("refX", -1 * ARROW_REFX)
                        .attr("markerWidth", ARROW_MARKER_WIDTH)
                        .attr("markerHeight", ARROW_MARKER_HEIGHT)
                        .attr("orient", "auto")
                        .append("path")
                        .attr("d", "M0,-5 L-10,0 L0,5")
                        .attr("fill", ARROW_FILL);
        })(),
            (null == n || isNaN(n)) && (n = 1);
        var c,
            g,
            v,
            y,
            p = this,
            E = 250,
            m = d3.svg
                .line()
                .x(function (t) {
                    return t.x;
                })
                .y(function (t) {
                    return t.y;
                })
                .interpolate("linear"),
            _ = m(x()),
            V = m([x()[0], x()[0]]),
            T = {
                path: {
                    id: null,
                    class: null,
                    d: null,
                    stroke: null,
                    "stroke-width": null,
                },
                weight: {
                    id: null,
                    startOffset: null,
                    dy: null,
                    fill: null,
                    "font-family": null,
                    "font-weight": null,
                    "font-size": null,
                    "text-anchor": null,
                    text: null,
                },
            };
        w(),
            (function () {
                switch (
                    ((T.path.id = "e" + r),
                    (T.path.d = V),
                    (T.path.stroke = graphEdgeProperties.path.default.stroke),
                    (T.path["stroke-width"] =
                        graphEdgeProperties.path.default["stroke-width"]),
                    i)
                ) {
                    case EDGE_TYPE_UDE:
                        T.path.class = "ude";
                        break;
                    case EDGE_TYPE_DE:
                        T.path.class = "de";
                        break;
                    case EDGE_TYPE_BDE:
                        T.path.class = "bde";
                }
                (T.weight.id = "ew" + r),
                    (T.weight.startOffset =
                        graphEdgeProperties.weight.default.startOffset),
                    (T.weight.dy = graphEdgeProperties.weight.default.dy),
                    (T.weight.fill = graphEdgeProperties.weight.default.fill),
                    (T.weight["font-family"] =
                        graphEdgeProperties.weight.default["font-family"]),
                    (T.weight["font-size"] = 0),
                    (T.weight["font-weight"] =
                        graphEdgeProperties.weight.default["font-weight"]),
                    (T.weight["text-anchor"] =
                        graphEdgeProperties.weight.default["text-anchor"]),
                    (T.weight.text = n),
                    (c = edgeSvg.append("path")),
                    c.attr("id", T.path.id).attr("class", T.path.class);
                try {
                    "MNaN,NaNLNaN,NaN" != T.path.d &&
                        c
                            .attr("d", T.path.d)
                            .attr("stroke", T.path.stroke)
                            .attr("stroke-width", T.path["stroke-width"]);
                } catch (t) {}
                (g = edgeWeightSvg.append("text")),
                    g.attr("id", T.weight.id),
                    g
                        .attr("fill", T.weight.fill)
                        .attr("font-family", T.weight["font-family"])
                        .attr("font-size", T.weight["font-size"])
                        .attr("font-weight", T.weight["font-weight"])
                        .attr("text-anchor", T.weight["text-anchor"]),
                    (v = g
                        .append("textPath")
                        .attr("xlink:href", function () {
                            return "#" + T.path.id;
                        })
                        .attr("startOffset", T.weight.startOffset)),
                    (y = v
                        .append("tspan")
                        .attr("dy", T.weight.dy)
                        .text(function () {
                            return T.weight.text;
                        }));
            })(),
            (this.redraw = function (t) {
                h(t);
            }),
            (this.animateHighlighted = function (t) {
                (null == t || isNaN(t)) && (t = E),
                    t <= 0 && (t = 1),
                    edgeSvg
                        .append("path")
                        .attr("id", "tempEdge" + c.attr("id"))
                        .attr(
                            "stroke",
                            graphEdgeProperties.animateHighlightedPath.stroke
                        )
                        .attr(
                            "stroke-width",
                            graphEdgeProperties.animateHighlightedPath[
                                "stroke-width"
                            ]
                        )
                        .transition()
                        .duration(t)
                        .each("start", function () {
                            edgeSvg
                                .select("#tempEdge" + c.attr("id"))
                                .attr("d", V);
                        })
                        .attr("d", _)
                        .each("end", function () {
                            c
                                .attr(
                                    "stroke",
                                    graphEdgeProperties.path.highlighted.stroke
                                )
                                .attr(
                                    "stroke-width",
                                    graphEdgeProperties.path["stroke-width"]
                                ),
                                edgeSvg
                                    .select("#tempEdge" + c.attr("id"))
                                    .remove(),
                                h(0);
                        });
            }),
            (this.showEdge = function () {
                (T.path.d = _),
                    (T.path["stroke-width"] =
                        graphEdgeProperties.path["stroke-width"]);
            }),
            (this.hideEdge = function () {
                T.path.d = V;
            }),
            (this.showWeight = function () {
                T.weight["font-size"] = graphEdgeProperties.weight["font-size"];
            }),
            (this.hideWeight = function () {
                T.weight["font-size"] = 0;
            }),
            (this.stateEdge = function (t) {
                var e;
                for (e in graphEdgeProperties.path[t])
                    T.path[e] = graphEdgeProperties.path[t][e];
                for (e in graphEdgeProperties.weight[t])
                    T.weight[e] = graphEdgeProperties.weight[t][e];
            }),
            (this.removeEdge = function () {
                t.removeEdge(p), e.removeEdge(p), c.remove(), g.remove();
            }),
            (this.refreshPath = function () {
                var t = V;
                w(), T.path.d == t ? (T.path.d = V) : (T.path.d = _);
            }),
            (this.changeVertexA = function (e) {
                var r = !1;
                T.path.d == _ && (r = !0),
                    t.removeEdge(p),
                    (t = e),
                    w(),
                    (_ = m(x())),
                    (V = m([x()[0]])),
                    (T.path.d = V),
                    t.addEdge(p),
                    r && (T.path.d = _);
            }),
            (this.changeVertexB = function (t) {
                var r = !1;
                T.path.d == _ && (r = !0),
                    e.removeEdge(p),
                    (e = t),
                    w(),
                    (_ = m(x())),
                    (V = m([x()[0]])),
                    (T.path.d = V),
                    e.addEdge(p),
                    r && (T.path.d = _);
            }),
            (this.changeType = function (t) {
                switch ((i = t)) {
                    case EDGE_TYPE_UDE:
                        T.path.class = "ude";
                        break;
                    case EDGE_TYPE_DE:
                        T.path.class = "de";
                        break;
                    case EDGE_TYPE_BDE:
                        T.path.class = "bde";
                }
            }),
            (this.changeWeight = function (t) {
                (n = t), (T.weight.text = n);
            }),
            (this.getVertex = function () {
                return [t, e];
            }),
            (this.getAttributes = function () {
                return deepCopy(T.path);
            }),
            (this.getType = function () {
                return i;
            });
    },
    GraphPolygonWidget = function (t, e) {
        function r(t) {
            (null == t || isNaN(t)) && (t = i),
                t <= 0 && (t = 1),
                n
                    .transition()
                    .duration(t)
                    .attr("points", l.polygon.points)
                    .attr("fill", l.polygon.fill)
                    .attr("stroke-width", l.polygon["stroke-width"])
                    .attr("opacity", l.polygon.opacity);
        }
        var i = 250,
            n = null,
            a = null,
            l = {
                polygon: {
                    class: null,
                    points: null,
                    fill: null,
                    "stroke-width": null,
                    opacity: null,
                },
            };
        !(function () {
            (n = polygonSvg.append("polygon")), (l.polygon.class = "p" + t);
            var r = "";
            for (key in e) r = r + e[key].x + "," + e[key].y + " ";
            (l.polygon.points = r),
                (l.polygon.fill = graphPolygonProperties.polygon.default.fill),
                (l.polygon["stroke-width"] = 0),
                (l.polygon.opacity = 1),
                n
                    .attr("class", l.polygon.class)
                    .attr("points", l.polygon.points)
                    .attr("fill", l.polygon.fill)
                    .attr("stroke-width", l.polygon["stroke-width"])
                    .attr("opacity", l.polygon.opacity);
        })(),
            (this.redraw = function (t) {
                r(t);
            }),
            (this.showPolygon = function () {
                (null != a && void 0 != a) || (a = POLYGON_DEFAULT),
                    (l.polygon.class = graphPolygonProperties.polygon.class),
                    (l.polygon["stroke-width"] =
                        graphPolygonProperties.polygon["stroke-width"]),
                    (l.polygon.fill = graphPolygonProperties.polygon[a].fill),
                    (l.polygon.opacity =
                        graphPolygonProperties.polygon[a].opacity);
            }),
            (this.hidePolygon = function () {
                l.polygon.opacity = 0;
            }),
            (this.removePolygon = function () {
                n.remove();
            }),
            (this.statePolygon = function (t) {
                a = t;
                var e;
                for (e in graphPolygonProperties.polygon[a])
                    l.polygon[e] = graphPolygonProperties.polygon[a][e];
            }),
            (this.getAttributes = function () {
                return deepCopy(l);
            }),
            (this.getClassNumber = function () {
                return t;
            });
    };
