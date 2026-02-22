// build/babel-remove-imports.js
module.exports = function ({ types: t }) {
  return {
    name: "remove-runtime-imports",
    visitor: {
      ImportDeclaration(path, state) {
        const config = (state.opts && state.opts.modules) || [];
        const spec = path.node.source && path.node.source.value;
        if (!spec || !config.includes(spec)) return;
        path.remove();
      },
      ExportNamedDeclaration(path, state) {
        const config = (state.opts && state.opts.modules) || [];
        if (path.node.source && config.includes(path.node.source.value)) {
          path.remove();
        }
      }
    }
  };
};
