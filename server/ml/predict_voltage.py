
import joblib
import sys
import os
import argparse
import warnings

# Suppress sklearn warnings if any
warnings.filterwarnings("ignore")

def predict(temperature, current):
    try:
        model_path = os.path.join(os.path.dirname(__file__), 'voltage_model.pkl')
        if not os.path.exists(model_path):
            print("Error: Model not found. Please run train_model.py first.")
            return

        model = joblib.load(model_path)
        
        # Predict
        prediction = model.predict([[temperature, current]])
        return prediction[0]
    except Exception as e:
        print(f"Error during prediction: {e}")
        return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Predict Voltage based on Temperature and Current')
    parser.add_argument('--temp', type=float, required=True, help='Temperature in Celsius')
    parser.add_argument('--current', type=float, required=True, help='Current in Amps')
    
    args = parser.parse_args()
    
    result = predict(args.temp, args.current)
    if result is not None:
        print(f"Predicted Voltage: {result:.2f} V")
