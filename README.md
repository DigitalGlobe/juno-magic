# juno-magic


A Jupyter Notebook extension for connection to and executing on remote Jupyter kernels hosted through [Juno](http://juno.timbr.io)
---


## Installation 
```bash
pip install juno-magic
```
or 
```bash
conda install juno-magic
```
---

## Usage

### Loading the extension

```
%reload_ext juno_magic
```

### Setting access tokens
Access tokens can be obtained by creating an account and generating an access token at the [Juno registration page](http://juno.timbr.io)
```
%juno token <token>
```

### Connecting to the WAMP router
```
%juno connect
```

### Viewing online remote kernels
```
%juno list
```

### Connecting to a remote kernel
```
%juno select <kernel-id>
```
