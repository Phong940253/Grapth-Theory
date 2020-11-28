#include <bits/stdc++.h>
using namespace std;

struct contact
{
    string sdt;
    int cuocGoiDen, cuocGoiDi;
};

struct arrContact
{
    int n;
    contact a[1000];
    contact &operator[](int i) { return a[i]; }
};

contact search(string sdt, arrContact c)
{
    for (int i = 0; i < c.n; ++i)
    {
        if (sdt == c[i].sdt)
            return c[i];
    }
}

contact maxContact(arrContact c)
{
    int Max = c[0].cuocGoiDen;
    contact temp = c[0];
    for (int i = 0; i < c.n; ++i)
        if (c[i].cuocGoiDen > Max)
        {
            Max = c[i].cuocGoiDen;
            temp = c[i];
        }
    return temp;
}

contact minContact(arrContact c)
{
    int Min = c[0].cuocGoiDi;
    contact temp = c[0];
    for (int i = 0; i < c.n; ++i)
        if (c[i].cuocGoiDen < Min)
        {
            Min = c[i].cuocGoiDi;
            temp = c[i];
        }
    return temp;
}

istream &operator>>(istream &is, contact &c)
{
    cin >> c.sdt >> c.cuocGoiDen >> c.cuocGoiDi;
}

ostream &operator<<(ostream &os, contact c)
{
    cout << "(" << c.sdt << "," << c.cuocGoiDen << "," << c.cuocGoiDi << ")" << endl;
}

int main()
{
    arrContact a;
    string sdt;
    cin >> a.n >> sdt;
    for (int i = 0; i < a.n; ++i)
    {
        cin >> a[i];
    }
    cout << search(sdt, a) << maxContact(a) << minContact(a);
}