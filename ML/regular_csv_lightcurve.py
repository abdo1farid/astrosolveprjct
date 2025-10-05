import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib

def process_lightcurve(csv_file):
    """Process a light curve CSV file and prepare it for model prediction."""
    print("Starting light curve processing...")
    
    # Read the CSV file
    if isinstance(csv_file, str):
        test_df = pd.read_csv(csv_file)
    else:
        test_df = pd.read_csv(csv_file)
    
    print(f"CSV loaded. Shape: {test_df.shape}")
    print(f"Available columns: {test_df.columns.tolist()}")
    
    # Try to identify time and flux columns
    time_col = None
    flux_col = None
    
    # Check for common time column names
    time_options = ['TIME', 'time', 'Time', 'TIMESTAMP', 'timestamp']
    for col in time_options:
        if col in test_df.columns:
            time_col = col
            break
    
    # Check for common flux column names
    flux_options = ['SAP_FLUX', 'FLUX', 'flux', 'Flux', 'SAPFLUX', 'sap_flux']
    for col in flux_options:
        if col in test_df.columns:
            flux_col = col
            break
    
    if time_col is None or flux_col is None:
        raise ValueError(f"Could not find required columns. Need time column (one of {time_options}) and flux column (one of {flux_options}). Available columns: {test_df.columns.tolist()}")
    
    print(f"Using columns: Time = {time_col}, Flux = {flux_col}")
    
    # Sort by time
    test_df = test_df.sort_values(by=time_col)

    # Extract time and flux values
    time = test_df[time_col].values
    flux = test_df[flux_col].values

    print("Normalizing flux values...")
    # Normalize flux values
    flux = (flux - np.min(flux)) / (np.max(flux) - np.min(flux))

    # Interpolate to fixed number of points
    num_points = 2001
    new_time = np.linspace(time.min(), time.max(), num_points)
    interp_flux = np.interp(new_time, time, flux)

    print(f"Interpolated to {num_points} points")

    # Create the feature matrix for model prediction
    features = np.column_stack([new_time, interp_flux])
    
    # Convert to DataFrame with proper column names
    feature_df = pd.DataFrame(features, columns=['TIME', 'NORMALIZED_FLUX'])
    
    print("Light curve processing complete!")
    return feature_df