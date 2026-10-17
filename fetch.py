import json,urllib.request,urllib.parse,re,os
UA={'User-Agent':'magorg-mintak/1.0 (andor)'}
def get(u): return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA)))
qs={'eger':'Eger castle panorama','gyor':'Győr old town square','miskolc':'Miskolc city center','tokaj':'Tokaj vineyard landscape','hortobagy':'Hortobágy nine-arch bridge','pecsdom':'Pécs cathedral','kecskemet':'Kecskemét town hall','sopron':'Sopron fire tower','esztergom':'Esztergom Basilica Danube','visegrad':'Danube Bend Visegrád view','metro':'Budapest metro station M4','nyugati':'Budapest Nyugati railway station','heroes':'Heroes Square Budapest','fisherman':"Fisherman's Bastion Budapest",'szentendre':'Szentendre main square','tihany':'Tihany abbey Balaton','vaci':'Váci utca Budapest','farm':'Hungarian Great Plain farmland','panelhaz':'Budapest housing estate panel buildings','piac':'Central Market Hall Budapest','bp':'Budapest Parliament panorama','lanchid':'Chain Bridge Budapest night','debrecen':'Debrecen main square','village':'Hollókő old village','balaton':'Lake Balaton','market':'Pécs Széchenyi tér','tram':'Budapest tram street','people':'Andrássy út Budapest','szeged':'Szeged Dom square'}
cred=[]
for k,q in qs.items():
  u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(dict(action='query',format='json',generator='search',gsrsearch=q+' filetype:bitmap',gsrnamespace=6,gsrlimit=8,prop='imageinfo',iiprop='url|extmetadata|size',iiurlwidth=1600))
  r=get(u)
  if 'query' not in r: print('MISS',k); continue
  ps=sorted(r['query']['pages'].values(),key=lambda p:p['index'])
  for p in ps:
    ii=p['imageinfo'][0]; m=ii['extmetadata']
    lic=m.get('LicenseShortName',{}).get('value','')
    if ii['width']<1400 or ii['width']<ii['height']: continue
    if not re.search(r'CC BY|CC0|Public domain',lic,re.I): continue
    d=urllib.request.urlopen(urllib.request.Request(ii['thumburl'],headers=UA)).read()
    open(f'site/img/{k}.jpg','wb').write(d)
    art=re.sub('<[^>]+>','',m.get('Artist',{}).get('value','?')).strip()
    cred.append(f"| {k}.jpg | {p['title']} | {art} | {lic} | {ii['descriptionurl']} |"); print(k,lic,art[:30]); break
open('site/CREDITS.md','w').write("# Képforrások\n\nMinden kép a Wikimedia Commonsról, szabad licenccel (forrásmegjelöléssel).\n\n| Fájl | Cím | Szerző | Licenc | Forrás |\n|---|---|---|---|---|\n"+"\n".join(cred)+"\n\nTérkép: hu.geojson — codeforgermany/click_that_hood (OpenStreetMap-alapú, ODbL), egyszerűsítve.\n\nPortré-avatarok: randomuser.me nem használt; az avatar mozaik generált SVG/CSS (nem valós személyek).\n")
