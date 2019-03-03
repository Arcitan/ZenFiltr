#!/usr/bin/env python

import struct
import sys
import os, msvcrt

# Set the I/O to O_BINARY to avoid modifications from input/output streams.
msvcrt.setmode(sys.stdin.fileno(), os.O_BINARY)
msvcrt.setmode(sys.stdout.fileno(), os.O_BINARY)

# Helper function that sends a message to the webapp.
def send_message(message):
   # Write message size.
  sys.stdout.write(struct.pack('I', len(message)))
  # Write the message itself.
  sys.stdout.write(message)
  sys.stdout.flush()

# Thread that reads messages from the webapp.
def read_thread_func():
  message_number = 0
  while 1:
    # Read the message length (first 4 bytes).
    text_length_bytes = sys.stdin.read(4)

    if len(text_length_bytes) == 0:
      sys.exit(0)

    # Unpack message length as 4 byte integer.
    text_length = struct.unpack('i', text_length_bytes)[0]

    # Read the text (JSON object) of the message.
    text = sys.stdin.read(text_length).decode('utf-8')

    send_message('{"echo": %s}' % text)


def Main():
    read_thread_func()
    sys.exit(0)

if __name__ == '__main__':
  Main()
