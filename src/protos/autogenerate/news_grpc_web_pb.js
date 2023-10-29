/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v4.24.3
// source: news.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')
const proto = require('./news_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.NewsServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.NewsServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.UpdateNewsDTO>}
 */
const methodDescriptor_NewsService_GetNews = new grpc.web.MethodDescriptor(
  '/NewsService/GetNews',
  grpc.web.MethodType.SERVER_STREAMING,
  google_protobuf_empty_pb.Empty,
  proto.UpdateNewsDTO,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UpdateNewsDTO.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.UpdateNewsDTO>}
 *     The XHR Node Readable Stream
 */
proto.NewsServiceClient.prototype.getNews =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/NewsService/GetNews',
      request,
      metadata || {},
      methodDescriptor_NewsService_GetNews);
};


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.UpdateNewsDTO>}
 *     The XHR Node Readable Stream
 */
proto.NewsServicePromiseClient.prototype.getNews =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/NewsService/GetNews',
      request,
      metadata || {},
      methodDescriptor_NewsService_GetNews);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.NewsId,
 *   !proto.UpdateNewsDTO>}
 */
const methodDescriptor_NewsService_GetNewById = new grpc.web.MethodDescriptor(
  '/NewsService/GetNewById',
  grpc.web.MethodType.UNARY,
  proto.NewsId,
  proto.UpdateNewsDTO,
  /**
   * @param {!proto.NewsId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UpdateNewsDTO.deserializeBinary
);


/**
 * @param {!proto.NewsId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.UpdateNewsDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UpdateNewsDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.NewsServiceClient.prototype.getNewById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/NewsService/GetNewById',
      request,
      metadata || {},
      methodDescriptor_NewsService_GetNewById,
      callback);
};


/**
 * @param {!proto.NewsId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UpdateNewsDTO>}
 *     Promise that resolves to the response
 */
proto.NewsServicePromiseClient.prototype.getNewById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/NewsService/GetNewById',
      request,
      metadata || {},
      methodDescriptor_NewsService_GetNewById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.NewsDTO,
 *   !proto.StringMessage>}
 */
const methodDescriptor_NewsService_CreateNews = new grpc.web.MethodDescriptor(
  '/NewsService/CreateNews',
  grpc.web.MethodType.UNARY,
  proto.NewsDTO,
  proto.StringMessage,
  /**
   * @param {!proto.NewsDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.StringMessage.deserializeBinary
);


/**
 * @param {!proto.NewsDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.StringMessage)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.StringMessage>|undefined}
 *     The XHR Node Readable Stream
 */
proto.NewsServiceClient.prototype.createNews =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/NewsService/CreateNews',
      request,
      metadata || {},
      methodDescriptor_NewsService_CreateNews,
      callback);
};


/**
 * @param {!proto.NewsDTO} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.StringMessage>}
 *     Promise that resolves to the response
 */
proto.NewsServicePromiseClient.prototype.createNews =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/NewsService/CreateNews',
      request,
      metadata || {},
      methodDescriptor_NewsService_CreateNews);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.UpdateNewsDTO,
 *   !proto.StringMessage>}
 */
const methodDescriptor_NewsService_UpdateNews = new grpc.web.MethodDescriptor(
  '/NewsService/UpdateNews',
  grpc.web.MethodType.UNARY,
  proto.UpdateNewsDTO,
  proto.StringMessage,
  /**
   * @param {!proto.UpdateNewsDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.StringMessage.deserializeBinary
);


/**
 * @param {!proto.UpdateNewsDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.StringMessage)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.StringMessage>|undefined}
 *     The XHR Node Readable Stream
 */
proto.NewsServiceClient.prototype.updateNews =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/NewsService/UpdateNews',
      request,
      metadata || {},
      methodDescriptor_NewsService_UpdateNews,
      callback);
};


/**
 * @param {!proto.UpdateNewsDTO} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.StringMessage>}
 *     Promise that resolves to the response
 */
proto.NewsServicePromiseClient.prototype.updateNews =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/NewsService/UpdateNews',
      request,
      metadata || {},
      methodDescriptor_NewsService_UpdateNews);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.NewsId,
 *   !proto.StringMessage>}
 */
const methodDescriptor_NewsService_RemoveNews = new grpc.web.MethodDescriptor(
  '/NewsService/RemoveNews',
  grpc.web.MethodType.UNARY,
  proto.NewsId,
  proto.StringMessage,
  /**
   * @param {!proto.NewsId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.StringMessage.deserializeBinary
);


/**
 * @param {!proto.NewsId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.StringMessage)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.StringMessage>|undefined}
 *     The XHR Node Readable Stream
 */
proto.NewsServiceClient.prototype.removeNews =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/NewsService/RemoveNews',
      request,
      metadata || {},
      methodDescriptor_NewsService_RemoveNews,
      callback);
};


/**
 * @param {!proto.NewsId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.StringMessage>}
 *     Promise that resolves to the response
 */
proto.NewsServicePromiseClient.prototype.removeNews =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/NewsService/RemoveNews',
      request,
      metadata || {},
      methodDescriptor_NewsService_RemoveNews);
};


module.exports = proto;

