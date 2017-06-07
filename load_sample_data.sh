#!/bin/bash

curl -XPUT http://localhost:9200/example -d '
{
 "mappings" : {
  "_default_" : {
   "properties" : {
    "url" : {"type": "string", "index" : "not_analyzed" },
    "title" : {"type": "string", "index" : "not_analyzed" },
    "description" : {"type": "string", "index" : "not_analyzed" }
   }
  }
 }
}
';

curl -XPOST 'localhost:9200/example/videos/_bulk?pretty' --data-binary @videos.json
