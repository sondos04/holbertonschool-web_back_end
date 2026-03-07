#!/usr/bin/env python3
"""Provides statistics about Nginx logs stored in MongoDB."""

from pymongo import MongoClient


def main() -> None:
    """Print stats about Nginx logs stored in MongoDB."""
    client = MongoClient("mongodb://127.0.0.1:27017")
    col = client.logs.nginx

    total = col.count_documents({})
    print(f"{total} logs")
    print("Methods:")

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for m in methods:
        print(f"\tmethod {m}: {col.count_documents({'method': m})}")

    status = col.count_documents({"method": "GET", "path": "/status"})
    print(f"{status} status check")


if __name__ == "__main__":
    main()
