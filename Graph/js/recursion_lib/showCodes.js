var factorialArgument="n = 4";var factorialCode="\
if (n <= 1) /* base case */\n\
  return 1;\n\
else /* recursive case */\n\
  return n*f(n-1);\n";var factorialDefault="";var factorialArray1="";var factorialArray2="";var gcdArgument="a = 9, b = 6";var gcdCode="\
if (b == 0) /* base case */\n\
  return a;\n\
else /* recursive case */\n\
  return f(b, a%b);"
var gcdDefault="9, 6";var gcdArray1="";var gcdArray2="";var catalanArgument="n = 4";var catalanCode="\
if (n == 0) /* base case */\n\
  return 1;\n\
else /* recursive case */\n\
  return f(n-1)*2*n*(2*n-1)/(n+1)/n;"
var catalanDefault="4";var catalanArray1="";var catalanArray2="";var rangeSumQueryArgument="i = 8";var rangeSumQueryCode="\
if (i == 0) /* base case */\n\
  return Math.max(a1[i], 0);\n\
else /* recursive case */\n\
  return Math.max(f(i-1) + a1[i], 0);";var rangeSumQueryDefault="8";var rangeSumQueryArray1="[4, -5, 4, -3, 4, 4, -4, 4, -5]";var rangeSumQueryArray2="";var fibonacciArgument="n = 5";var fibonacciCode="\
if (n <= 1) /* base case */\n\
  return n;\n\
else /* recursive caseS */\n\
  return f(n-1) + f(n-2);";var fibonacciDefault="5";var fibonacciArray1="";var fibonacciArray2="";var nChooseKArgument="n = 4, k = 2";var nChooseKCode="\
if (k == 0 || k == n) /* base caseS */\n\
  return 1;\n\
else /* recursive caseS */\n\
  return f(n-1, k-1) + /* take */ \n\
         f(n-1, k); /* not take */";var nChooseKDefault="4, 2";var nChooseKArray1="";var nChooseKArray2="";var flightPlannerArgument="a = 0, d = 0";var flightPlannerCode="\
if (a == 0 && d == 4) return 0;\n\
else if (a<0 || a>4 || d>3) return 99;\n\
else if (d == 3) {\n\
  if (a == 0)\n\
    return 30 - a1[a][d] + f(a,d+1);\n\
  else if (a == 1)\n\
    return 20 - a1[a][d] + f(a-1,d+1);\n\
  else return 99;\n\
}\n\
else {\n\
  var ans = 30 - a1[a][d] + f(a,d+1);\n\
  if (a <= 3)\n\
    ans = Math.min(ans, 60 - a1[a][d] + f(a+1,d+1));\n\
  if (a > 0)\n\
    ans = Math.min(ans, 20 - a1[a][d] + f(a-1,d+1));\n\
  return ans;\n\
}";var flightPlannerDefault="0, 0";var flightPlannerArray1="[[1, -9, -9, 1], [1, 9, 9, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]";var flightPlannerArray2="";var knapsackArgument="i = 3, w = 12";var knapsackCode="\
/* base caseS */\n\
if (w == 0 || i < 0) return 0;\n\
else if (a2[i] > w) return f(i-1, w);\n\
/* recursive caseS */\n\
return Math.max(\n\
  a1[i] + f(i-1, w-a2[i]), /* take */\n\
          f(i-1, w)); /* not take */";var knapsackDefault="3, 12";var knapsackArray1="[100, 70, 50, 10]";var knapsackArray2="[10, 4, 6, 12]";var coinChangeArgument="v = 7";var coinChangeCode="\
if (v == 0) return 0; /* base case */\n\
/* recursive caseS */\n\
var ans = 99;\n\
for (var i = 0; i < 4; i++)\n\
  if (v-a1[i] >= 0)\n\
    ans = Math.min(ans, 1 + f(v-a1[i]));\n\
return ans;";var coinChangeDefault="7";var coinChangeArray1="[1, 3, 4, 5]";var coinChangeArray2="";var LisArgument="i = 5";var LisCode="\
if (i == 0) return 1; /* base case */\n\
/* recursive caseS */\n\
var ans = 1;\n\
for (var j = 0; j < i; j++)\n\
  if (a1[j] < a1[i])\n\
    ans = Math.max(ans, f(j)+1);\n\
return ans;";var LisDefault="5";var LisArray1="[-7,10,9,2,3,8,8,1]";var LisArray2="";var UVa10702Argument="u = 0, t = 3";var UVa10702Code="\
if (t == 0) return a2[u] ? 0 : -99;\n\
var ans = -99;\n\
for (var v = 0; v < 3; v++) {\n\
  if (v == u) continue;\n\
  ans=Math.max(ans, a1[u][v]+f(v,t-1));\n\
}\n\
return ans;";var UVa10702Default="0, 3";var UVa10702Array1="[[0, 3, 5], [5, 0, 1], [9, 2, 0]]";var UVa10702Array2="[0,1,1]";var TspArgument="u = 0, m = 1";var TspCode="\
if (m == (1<<4)-1) return a1[u][0];\n\
var ans = 99; /* recursive caseS */\n\
for (var v = 0; v < 4; v++)\n\
  if (v != u && ((m & (1<<v)) == 0))\n\
    ans = Math.min(ans,\n\
      a1[u][v] + f(v, m | (1<<v)));\n\
return ans;";var TspDefault="0, 1";var TspArray1="[[0, 20, 42, 35], [20, 0, 30, 34], [42, 30, 0, 12], [35, 34, 12, 0]]";var TspArray2="";var matchingArgument="bm = 0";var matchingCode="\
if (bm == (1<<4)-1) return 0;\n\
else {\n\
  var p1, p2, ans = 0;\n\
  if ((bm&8) == 0) p1 = 3;\n\
  if ((bm&4) == 0) p1 = 2;\n\
  if ((bm&2) == 0) p1 = 1;\n\
  if ((bm&1) == 0) p1 = 0;\n\
  for (p2 = 0; p2 < 4; p2++)\n\
    if ((a1[p1][p2] == 1 && (bm & (1<<p2)) == 0) || p1 == p2)\n\
      ans = Math.max(ans, a1[p1][p2] + f(bm|(1<<p1)|(1<<p2)));\n\
  return ans;\n\
}";var matchingDefault="0";var matchingArray1="[[0, 0, 1, 0], [0, 0, 0, 1], [1, 0, 0, 0], [0, 1, 0, 0]]";var matchingArray2="";function showFactorialCode(){$('#arguments_textBox').val(factorialArgument);$('#code').val(factorialCode);$('#n_input').val(factorialDefault);$('#variable1_textBox').val(factorialArray1);$('#variable2_textBox').val(factorialArray2);}
function showGcdCode(){$('#arguments_textBox').val(gcdArgument);$('#code').val(gcdCode);$('#n_input').val(gcdDefault);$('#variable1_textBox').val(gcdArray1);$('#variable2_textBox').val(gcdArray2);}
function showCatalanCode(){$('#arguments_textBox').val(catalanArgument);$('#code').val(catalanCode);$('#n_input').val(catalanDefault);$('#variable1_textBox').val(catalanArray1);$('#variable2_textBox').val(catalanArray2);}
function showFibonacciCode(){$('#arguments_textBox').val(fibonacciArgument);$('#code').val(fibonacciCode);$('#n_input').val(fibonacciDefault);$('#variable1_textBox').val(fibonacciArray1);$('#variable2_textBox').val(fibonacciArray2);}
function showNChooseKCode(){$('#arguments_textBox').val(nChooseKArgument);$('#code').val(nChooseKCode);$('#n_input').val(nChooseKDefault);$('#variable1_textBox').val(nChooseKArray1);$('#variable2_textBox').val(nChooseKArray2);}
function showRangeSumQueryCode(){$('#arguments_textBox').val(rangeSumQueryArgument);$('#code').val(rangeSumQueryCode);$('#n_input').val(rangeSumQueryDefault);$('#variable1_textBox').val(rangeSumQueryArray1);$('#variable2_textBox').val(rangeSumQueryArray2);}
function showFlightPlannerCode(){$('#arguments_textBox').val(flightPlannerArgument);$('#code').val(flightPlannerCode);$('#n_input').val(flightPlannerDefault);$('#variable1_textBox').val(flightPlannerArray1);$('#variable2_textBox').val(flightPlannerArray2);}
function showKnapsackCode(){$('#arguments_textBox').val(knapsackArgument);$('#code').val(knapsackCode);$('#n_input').val(knapsackDefault);$('#variable1_textBox').val(knapsackArray1);$('#variable2_textBox').val(knapsackArray2);}
function showCoinChangeCode(){$('#arguments_textBox').val(coinChangeArgument);$('#code').val(coinChangeCode);$('#n_input').val(coinChangeDefault);$('#variable1_textBox').val(coinChangeArray1);$('#variable2_textBox').val(coinChangeArray2);}
function showLisCode(){$('#arguments_textBox').val(LisArgument);$('#code').val(LisCode);$('#n_input').val(LisDefault);$('#variable1_textBox').val(LisArray1);$('#variable2_textBox').val(LisArray2);}
function showUVa10702Code(){$('#arguments_textBox').val(UVa10702Argument);$('#code').val(UVa10702Code);$('#n_input').val(UVa10702Default);$('#variable1_textBox').val(UVa10702Array1);$('#variable2_textBox').val(UVa10702Array2);}
function showTspCode(){$('#arguments_textBox').val(TspArgument);$('#code').val(TspCode);$('#n_input').val(TspDefault);$('#variable1_textBox').val(TspArray1);$('#variable2_textBox').val(TspArray2);}
function showMatchingCode(){$('#arguments_textBox').val(matchingArgument);$('#code').val(matchingCode);$('#n_input').val(matchingDefault);$('#variable1_textBox').val(matchingArray1);$('#variable2_textBox').val(matchingArray2);}