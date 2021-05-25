FROM golang:latest
WORKDIR /app
ADD . .
RUN rm -rf go.mod
RUN go mod init web
RUN go mod vendor
CMD ["go", "run", "-mod=vendor", "main.go"]