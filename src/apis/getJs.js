export const getAMap=()=> {
        return new Promise(function (resolve, reject) {
          
          var script = document.createElement('script')
          script.type = 'text/javascript'
          script.async = true
          script.src = 'http://'+window.location.host+'config.js'
          // script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }