1 + 1

from datetime import date, timedelta

start = date(1990, 1, 1)
end = date(2010, 12, 31)

dstart = [
    date(1990, 1, 2),
    date(1991, 1, 2),
    date(1993, 1, 1),
    date(1994, 1, 2),
    date(1997, 1, 2),
    date(1998, 1, 3),
    date(2001, 1, 1),

]

dend = [
    date(1991, 1, 1),
    date(1992, 1, 1),
    date(1994, 1, 1),
    date(1996, 1, 1),
    date(1998, 1, 2),
    date(2000, 1, 2),
    date(2003, 1, 2),
    # None
]

dnum = [
    23,
    76,
    90,
    34,
    7,
    11,
    11,
]

dchar = [
    'A',
    'S',
    'A',
    'A',
    'S',
    'S',
    'A',
]


fff = dict((itm[0], {'astartDate': itm[0], 
                'endDate': itm[1] or end, 
                'numberHours': itm[2], 
                'indicativve': itm[3] }) 
           for itm in zip(dstart, 
                          dend, 
                          dnum, 
                          dchar))

endset = {end}

startset = {start}

for itm in fff.values():
    startset.add(itm['astartDate'])
    if itm['astartDate'] != start:
        endset.add(itm['astartDate'] - timedelta(days=1))

    if itm['endDate'] is not None:
        startset.add(itm['endDate'] + timedelta(days=1))
        endset.add(itm['endDate'])




zz = zip(sorted(list(startset)), 
         sorted(list(endset)))

por = [fff.get(ss, {'astartDate': ss, 
                    'endDate': es, 
                    'numberHours': 50, 
                    'indicativve': 'F' }) 
       for ss, es in zz]

from pprint import pprint
pprint(por)




print(sorted(list(startset)))
print(sorted(list(endset)))

ff = {(date(2001, 9, 11), date(2002, 1, 1)): 1}

[(ss, es)
       for ss, es in zz
       if ss < es]