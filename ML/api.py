from flask import Flask, request, jsonify
from flask_cors import CORS
import io
from predict_handler import predict_from_csv

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the file from the request
        file = request.files['file']
        
        if file:
            # Read the file content
            stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
            
            # Use the prediction handler to process and predict
            result = predict_from_csv(stream)
            
            if result['success']:
                return jsonify(result)
            else:
                return jsonify(result), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)