# import mimetypes

# mimetypes.add_type("text/javascript", ".js", True)

from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer


def run():
    Handler = SimpleHTTPRequestHandler
    Handler.extensions_map.update({
            # '': 'text/plain',
            '.js': 'text/javascript'
        })

    addr = ('127.0.0.1', 8001)
    print('Running on:', addr)
    with TCPServer(addr, Handler) as httpd:
        httpd.serve_forever()


if __name__ == '__main__':
    run()