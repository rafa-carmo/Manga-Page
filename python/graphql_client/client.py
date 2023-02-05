from gql import Client
from gql.transport.aiohttp import AIOHTTPTransport
import asyncio
from time import sleep

class ClientGraphql:
    def __init__(self, baseUrl, timeout=300):
        if(baseUrl==None):
            raise Exception("Base url not defined, verify your .env file")

        transport = AIOHTTPTransport(url=baseUrl)
        self.client= Client(transport=transport, fetch_schema_from_transport=True, execute_timeout=timeout)
        self.testConection()
        ...

    def executeClient(self, query, variables=None):
        return self.client.execute(query, variable_values=variables)
    
    def testConection(self):
        attempt = 0
        while attempt < 3:
            try:
                asyncio.run(self.client.connect_async())
                asyncio.run(self.client.close_async())
                break
            except Exception as e:
                attempt += 1
                print(f"Connection server error - LOG: {e} - Tentativa {attempt}...")
                sleep(5)
        if(attempt >= 3):
            raise Exception(f"Connection server error")