#!/usr/bin/env python3
"""
Provides some stats about Nginx logs stored in MongoDB
"""

from pymongo import MongoClient

if __name__ == "__main__":
    # الاتصال بقاعدة البيانات
    client = MongoClient('mongodb://127.0.0.1:27017')
    collection = client.logs.nginx

    # عدد كل الـ documents
    logs_count = collection.count_documents({})
    print(f"{logs_count} logs")

    # عدد كل method
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = collection.count_documents({"method": method})
        print(f"\tmethod {method}: {count}")

    # عدد GET مع path = /status
    status_check = collection.count_documents({"method": "GET", "path": "/status"})
    print(f"{status_check} status check")
