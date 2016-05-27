export default require((process.env.NODE_ENV === 'production') ? './isomorphic-mode.js' : './hmr-mode.js').default
