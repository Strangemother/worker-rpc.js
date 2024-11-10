# RPC 2.0 To-Do List

Enhancements
Issue Resolution
New Features
Code Refactoring
Configuration

+ Incorporate more proxy functionality to improve method guessing.
+ Resolve the argument call issue by using `apply` instead of `call` to allow multiple arguments to be passed through.
+ Add support for shared workers, testing their functionality and integration.
+ Implement dedicated workers for specialized tasks.
+ Convert the 'methods' map into a new map method for cleaner callback processes.
+ Explore the implementation of a configuration utility.
+ Consider a `.then()` callback on (primary side) rpc methods