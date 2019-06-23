from flask import Flask, render_template, redirect, jsonify, url_for
from flask_pymongo import PyMongo
import json
from flask import Response
# import amusement_scrape

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/coaster_app")


# app.config["MONGO_URI"] = "mongodb://localhost:27017/craftapp"
# mongo = PyMongo(app)

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    amuse_data = mongo.db.amusecollection.find_one()

    # Return template and data
    return render_template("index.html", result=amuse_data)


# Route that will trigger the scrape function
# @app.route("/scrape")
# def scraped():

#     # Run the scrape function
#     amuse_data = amusement_scrape.scrape_amusement()
#     # Update the Mongo database using update and upsert=True
#     # mongo.db.amusecollection.update({}, amuse_data, upsert=True)
    
#     mongo.db.amusecollection.drop()

#     for result in amuse_data:
#         mongo.db.amusecollection.insert_many(result)

#     # Redirect back to home page
#     return redirect("/")

@app.route("/get_data")
def getdata():
    data = []
    for record in mongo.db.amusecollection.find():
        data.append({'Roller Coaster' : record['Roller Coaster'], 'Amusement Park' : record['Amusement Park'], 'Type' : record['Type'], 'Design' : record['Design'], 'Status' : record['Status'], 'Opened' : record['Opened']})

    # Redirect back to home page
    # return(jsonify(data))
    app.config["JSON_SORT_KEYS"] = False
    return jsonify({'result' : data})
    # return Response(json.dumps(data),  mimetype='application/json')


    
@app.route("/charts")
def charts():
    return render_template("index2.html")

@app.route("/accident")
def accident():
    return render_template("index_static.html")


@app.route("/defunct")
def defunct():
    return render_template("index_defunct.html")

@app.route("/mapped")
def mapped():
    return render_template("mappingindex.html")   


if __name__ == "__main__":
    app.run(debug=True)


