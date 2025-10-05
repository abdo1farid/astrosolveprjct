import numpy as np
import pandas as pd
import joblib

def predict_from_csv(csv_file, model_path='model_performed.joblib'):
    """
    Process a CSV file and make predictions using the model.
    Also saves predictions to a CSV file.
    
    Args:
        csv_file: Path to the uploaded CSV file
        model_path: Path to the trained model file
    
    Returns:
        dict: Prediction results and path to the predictions CSV
    """
    try:
        # Load CSV and remove first column
        df = pd.read_csv(csv_file)
        # Remove the first column
        df = df.iloc[:, 1:]  # Select all rows, all columns except the first
        print("\n=== Data Processing ===")
        print("Original columns:", df.columns.tolist())
        print("Shape after removing first column:", df.shape)
        
        # Convert to numpy array
        X = df.to_numpy()
        
        # Load model and make prediction
        model = joblib.load(model_path)
        prediction = model.predict(X)
        
        # Create predictions DataFrame with just row numbers and predictions
        predictions_df = pd.DataFrame({
            'Row': range(1, len(prediction) + 1),
            'Prediction': prediction
        })
        
        # Convert predictions to CSV string
        csv_output = predictions_df.to_csv(index=False)
        
        # Just return the CSV content in the response
        print("\nPredictions converted to CSV format")
        
        # Print predictions in a clear format
        print("\n=== Predictions ===")
        print("Input shape:", X.shape)
        print("\nPrediction results:")
        for i, pred in enumerate(prediction):
            print(f"Row {i + 1}: {pred}")
        print("CSV data generated successfully")
        print("=================\n")
        
        return {
            'success': True,
            'prediction': prediction.tolist(),
            'csv_content': csv_output
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }
