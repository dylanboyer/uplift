import json, os, psycopg2

class SessionManager:
	def __init__(self):
		self.ip = os.environ.get("EC2_PUBLIC_IP")
		self.database = os.environ.get("PSQL_DB")
		self.user = os.environ.get("PSQL_USER")
		self.port = os.environ.get("PSQL_PORT")
		self.password = os.environ.get("PSQL_PWD")

		self.connection = psycopg2.connect(
		   database=self.database, user=self.user, password=self.password, host=self.ip, port=self.port
		)

		self.cursor = self.connection.cursor()

	def __enter__(self):
		self.cursor = self.connection.cursor()
		return self.cursor

	def __exit__(self, exc_type, exc_value, exc_traceback):
		try:
			self.connection.commit()
		except Exception as e:
			print(e)
			self.connection.rollback()
		self.connection.close()



class Filters:
	def __init__(self, args_dict):
		self.args_dict = args_dict



def session_to_json(session):

	data = session.fetchall();

	colnames = [desc[0] for desc in session.description]

	json_data = []
	for entry in data:
		entry_info = {}
		for attribute, value in zip(colnames, entry):
			entry_info[attribute] = value

		json_data.append(entry_info)

	return json_data

def session_single_to_json(session):
	data = session.fetchall();

	json_data = []
	for entry in data:
		json_data.append(entry[0])

	return json_data