### init setup for new plugin
- rename wp-react-starter.php to <your-plugin-name>.php and any relevant names inside as well

### quick-start
- this basically transpiles all code into /build directory for deployment
```
yarn
yarn dev        # dev build (basically compiles into ./php and ./build) (should also auto-refresh on file changes)
yarn build      # prod build (optimized version of dev)
```

### deploying
- copy <your-plugin-name>.php and `build` directory into your `wp-content/plugins/<your-plugin-name>` directory
- activate plugin and youre good to go
```

### references
- original repo fork from https://github.com/shewa12/wp-react-starter