// /* tracing.js */

// // Require dependencies
// const { NodeTracerProvider } = require("@opentelemetry/node");
// const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/tracing");
// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
// const { registerInstrumentations } = require('@opentelemetry/instrumentation');
// const {diag, DiagLogLevel} = require('@opentelemetry/api');

// diag.setLogger(console, DiagLogLevel.ALL);


// // Create a tracer provider
// const provider = new NodeTracerProvider();

// // The exporter handles sending spans to your tracing backend
// const exporter = new ConsoleSpanExporter();

// // The simple span processor sends spans to the exporter as soon as they are ended.
// const processor = new SimpleSpanProcessor(exporter);
// provider.addSpanProcessor(processor);

// // The provider must be registered in order to
// // be used by the OpenTelemetry API and instrumentations
// provider.register();

// // This will automatically enable all instrumentations
// registerInstrumentations({
//   instrumentations: [getNodeAutoInstrumentations()],
// });


const opentelemetry = require("@opentelemetry/sdk-node");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {diag, DiagLogLevel} = require('@opentelemetry/api');

diag.setLogger(console, DiagLogLevel.ALL);

const jaegerExporter = new JaegerExporter();
const prometheusExporter = new PrometheusExporter({ startServer: true });

const sdk = new opentelemetry.NodeSDK({
  // Optional - if omitted, the tracing SDK will not be initialized
  traceExporter: jaegerExporter,
  // Optional - If omitted, the metrics SDK will not be initialized
  metricExporter: prometheusExporter,
  // Optional - you can use the metapackage or load each instrumentation individually
  instrumentations: [getNodeAutoInstrumentations()],
  // See the Configuration section below for additional  configuration options
});

// You can optionally detect resources asynchronously from the environment.
// Detected resources are merged with the resources provided in the SDK configuration.
sdk.start().then(() => {
  // Resources have been detected and SDK is started
});
