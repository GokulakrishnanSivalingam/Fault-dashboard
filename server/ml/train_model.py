
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
import os

# 1. Generate Synthetic Data
# Relationship: Voltage = 240 - (0.5 * Temperature) - (0.1 * Current) + RandomNoise
def generate_data(n_samples=1000):
    np.random.seed(42)
    
    # Temperature: 20 to 80 degrees Celsius
    temperature = np.random.uniform(20, 80, n_samples)
    
    # Current: 0 to 20 Amps
    current = np.random.uniform(0, 20, n_samples)
    
    # Noise
    noise = np.random.normal(0, 1, n_samples)
    
    # Voltage calculation
    voltage = 240 - (0.5 * temperature) - (0.1 * current) + noise
    
    df = pd.DataFrame({
        'temperature': temperature,
        'current': current,
        'voltage': voltage
    })
    
    return df

def train_model():
    print("Generating synthetic data...")
    data = generate_data()
    
    X = data[['temperature', 'current']]
    y = data['voltage']
    
    print("Training Linear Regression model...")
    model = LinearRegression()
    model.fit(X, y)
    
    print("Model trained.")
    print(f"Coefficients: {model.coef_}")
    print(f"Intercept: {model.intercept_}")
    
    # Save model
    model_path = os.path.join(os.path.dirname(__file__), 'voltage_model.pkl')
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_model()
