#!/usr/bin/env python

import os, sys
import pymongo
import re

def getSyn(filename):
	file = open(filename, "r")
	lst = []
	for item in file.readlines():
		if item.strip() not in lst:
			lst.append(item.strip())
	file.close()
	return lst

def eraseHighlight(collection):
	files = list(collection.find())
	for item in files:
		text = item["content"]
		text = text.replace("<mark>", "")
		text = text.replace("</mark>", "")
		collection.update_one(
				{
		  		'_id': item['_id']
				},{
			  		'$set': {
			    	'content': text
			  		}
				}, upsert=False)

def getScores(incl, excl, collection, update):
	files = list(collection.find())
	for item in files:
		score = 0
		for word in incl:
			score += item["content"].lower().count(word.lower())
		for word in excl:
			score -= item["content"].lower().count(word.lower())
		update[item['name']] = score

def updateScore(update, collection):
	for filename,score in update.items():
		p = collection.find_one({'name':filename})
		if(p!= None):
			collection.update_one(
				{
		  		'_id': p['_id']
				},{
			  		'$set': {
			    	'grade': score
			  		}
				}, upsert=False)

def updateHighlight(update,incl,excl,collection):
	for filename,score in update.items():
		p = collection.find_one({'name':filename})
		if(p!= None):
			text = p['content']
			for word in incl:
				pattern = re.compile(word, re.IGNORECASE)
				text = pattern.sub("<mark>" + word + "</mark>", text)
			for word in excl:
				pattern = re.compile(word, re.IGNORECASE)
				text = pattern.sub("<mark>" + word + "</mark>", text)
			collection.update_one(
				{
		  		'_id': p['_id']
				},{
			  		'$set': {
			    	'content': text
			  		}
				}, upsert=False)


def main():
	update = {}
	excl = getSyn("./routes/perl/InclExcl/excl.txt")
	incl = getSyn("./routes/perl/InclExcl/incl.txt")
	client = pymongo.MongoClient('localhost', 27017)
	db = client.records
	collection = db.records
	eraseHighlight(collection)
	getScores(incl, excl, collection, update)
	updateScore(update, collection)
	updateHighlight(update,incl,excl,collection)
	print("Done!")
	sys.stdout.flush()

main()
