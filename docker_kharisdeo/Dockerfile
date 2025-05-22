# Stage 1: Build Stage for C++
FROM gcc:bookworm AS cpp-builder

# Set working directory
WORKDIR /app

# Copy the C++ source code into the container
COPY ./hello.cpp .

# Build the C++ application
RUN g++ -static -o hello-cpp hello.cpp


# Stage 2: Final Stage
FROM alpine:latest

WORKDIR /app

# Install C++ runtime library
RUN apk add --no-cache libstdc++

COPY --from=cpp-builder /app/hello-cpp ./hello-cpp

RUN chmod +x hello-cpp

CMD ["./hello-cpp"]
