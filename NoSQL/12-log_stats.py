#!/usr/bin/env python3
"""Log stats"""
from pymongo import MongoClient


if __name__ == "__main__":
    client = MongoClient("mongodb://127.0.0.1:27017")
    collection = client.logs.nginx

    logs_count = collection.count_documents({})
    print("{} logs".format(logs_count))
    print("Methods:")

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]

    for method in methods:
        count = collection.count_documents({"method": method})
        print("	method {}: {}".format(method, count))

    status_count = collection.count_documents({
        "method": "GET",
        "path": "/status"
    })

    print("{} status check".format(status_count))
