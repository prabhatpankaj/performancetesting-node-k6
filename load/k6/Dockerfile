FROM grafana/k6
COPY scripts /scripts
WORKDIR /scripts
ENTRYPOINT ["k6"]
CMD ["run", "test.js"]