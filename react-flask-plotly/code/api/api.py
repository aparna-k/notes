from flask import Flask
import numpy as np
from flask import request


app = Flask(__name__)

@app.route('/check')
def get_current_time():
    return {'handshake': 'hello'}

@app.route('/getHistData', methods=['POST'])
def get_hist_data():
  mean = float(request.json['mean'])
  std = float(request.json['std'])
  num_points = int(request.json['num_points'])
  x = np.random.normal(loc=mean, scale=std, size=num_points)
  resp = {
            'data': x.tolist()
         }
  
  return resp