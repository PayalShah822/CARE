#!/usr/bin/python3

import sys, json

def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])


def main():
    #get our data as an array from read_in()
    lines = read_in()
    sort = lines.split(";")
    print("Inclusion Criteria: " + sort[0])
    print("Exclusion Criteria: " + sort[1])
    sys.stdout.flush()

#start process
if __name__ == '__main__':
    main()

