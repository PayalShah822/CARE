#!/usr/bin/env python

import xml.etree.ElementTree as ET
import os, sys
import pymongo

client = pymongo.MongoClient('localhost', 27017)
db = client.records
collection = db.records

collection.remove({})
for root, dirnames, files in os.walk('./routes/perl/xml'):
    for name in files:
        if(name!="files.txt"):
            dbName = name.replace('.xml', '')
            parser = ET.XMLParser(encoding="utf-8")
            tree = ET.parse('./routes/perl/xml/' + name, parser)
            root = tree.getroot()

            for child in root:
                if child.tag == 'TAGS':
                    root.remove(child)
            
            for elem in root.getiterator():
                try:
                    elem.text = elem.text.replace('\n', '<br>')
                    elem.text = elem.text.strip('<br>')
                except AttributeError:
                    pass
            try:
                print(elem.text)
                collection.insert(
                    {
                        "name": dbName,
                        "content": elem.text,
                        "grade": 0
                    }
                )
            except pymongo.errors.DuplicateKeyError:
                pass

    break

print("Done!")
sys.stdout.flush()
