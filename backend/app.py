from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/run', methods=['POST'])
def run_code():
    try:
        # Get the Python code from the request
        code = request.json.get("code", "")

        # Run the code in a sandboxed environment
        result = subprocess.run(["python3", "-c", code], capture_output=True, text=True, timeout=5)

        return jsonify({"output": result.stdout, "error": result.stderr})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)