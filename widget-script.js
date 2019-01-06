!((d, w) => {
  
  if(w.bibleTagsWidget) return;

  // constants
  const INITIAL_HEIGHT = 250;
  const MINIMUM_HEIGHT = 200;
  const SPACE_BELOW_NEEDED_TO_AUTOMATICALLY_EXPAND_DOWN = 800;
  const MAXIMUM_NON_MOBILE_WIDGET_WIDTH = 400;
  const DEFAULT_MARGIN = 10;
  const DEFAULT_Z_INDEX = 100;
  
  // get the script parameters
  const scriptParamObject = {};
  (document.currentScript || document.getElementById('bibletags-widget-script'))
    .getAttribute('src')
    .split('#')
    .slice(1)
    .join('#')
    .split('&')
    .forEach(arg => {
      const argParts = arg.split('=');
      scriptParamObject[argParts[0]] = argParts[1];
    });

  // set widget domain and url per the environment
  let widgetDomain, widgetUrl;

  if(scriptParamObject.widget === 'local') {
    widgetDomain = '*';
    widgetUrl = `http://localhost:3000/index.html`;
  } else if(scriptParamObject.widget === 'staging') {
    widgetDomain = 'https://cdn.staging.bibletags.org';
    widgetUrl = `${widgetDomain}/widget/build/index.html`;
  } else {
    widgetDomain = 'https://cdn.bibletags.org';
    widgetUrl = `${widgetDomain}/widget/build/index.html`;
  }

  const widgetUrlHash = `#data=${scriptParamObject.data || ''}`;

  let onDeckInstances = [];
  let utilityInstance;
  let utilityActionIndex = 1;
  const instances = {};
  let settings = {};
  let idIndex = 1;

  const newEl = (type, attrs) => {
    const el = d.createElement(type);
    for (let attr in attrs) {
      el[attr] = attrs[attr];
    }
    return el;
  };

  const getMobileMode = () => Math.min(w.innerWidth, w.innerHeight) < 500;
  
  const getContainerEl = options => ((!getMobileMode() && options.containerEl) || d.body);
  
  const hideWidgetEl = widgetEl => {
    const widgetElStyle = widgetEl.style;
    widgetElStyle.position = 'absolute';
    widgetElStyle.overflow = 'hidden';
    widgetElStyle.top = 0;
    widgetElStyle.left = 0;
    widgetElStyle.width = `1px`;
    widgetElStyle.height = `1px`;
    widgetElStyle.visibility = `hidden`;
  };

  const setWidgetElStyle = ({ widgetEl, style, iframeEl }) => {
    
    const formVal = val => typeof val === 'number' ? `${val}px` : (val == null ? `auto` : val);

    for(let attr in style) {
      widgetEl.style[attr] = formVal(style[attr]);
    }

    iframeEl.style.width = `100%`;
    iframeEl.style.height = `100%`;

  };

  const getWidgetElStyle = ({ options }) => {
    const mobileMode = getMobileMode();
    const containerEl = getContainerEl(options);

    const margin = parseInt(options.margin, 10) || DEFAULT_MARGIN;
    const containerElScroll = mobileMode
      ?
        { x:0, y:0 }
      :
        (
          options.containerElTargetScroll
            || 
          {
            x: containerEl.scrollLeft,
            y: containerEl.scrollTop,
          }
        );
    
    const containerElRect = containerEl.getBoundingClientRect();
    const containerElInnerWidth = containerEl.clientWidth;
    const containerElInnerHeight = containerEl.clientHeight;
    const tenPercentDownInContainerEl = containerElRect.top + containerElRect.height * .1;
    const anchorElRect = options.anchorEl
      ?
        options.anchorEl.getBoundingClientRect()
      : 
        {
          top: tenPercentDownInContainerEl,
          bottom: tenPercentDownInContainerEl,
          left: containerElRect.left + containerElInnerWidth/2,
          width: 0,
          height: 0,
        };
    const containerElComputedStyle = getComputedStyle(containerEl)
    const containerElBorderTop = parseInt(containerElComputedStyle.borderTopWidth, 10) || 0;
    const containerElBorderLeft = parseInt(containerElComputedStyle.borderLeftWidth, 10) || 0;
    const containerElBorderAndScrollBottom = containerElRect.height - containerElInnerHeight - containerElBorderTop;
    const containerElBorderAndScrollRight = containerElRect.width - containerElInnerWidth - containerElBorderLeft;

    const width = mobileMode ? '100%' : Math.max(Math.min(containerElInnerWidth - margin * 2, MAXIMUM_NON_MOBILE_WIDGET_WIDTH), 0.1);
    const spaceAboveInContainer = anchorElRect.top - containerElRect.top - containerElBorderTop;
    const spaceBelowInContainer = containerElRect.bottom - anchorElRect.bottom - containerElBorderAndScrollBottom;
    const spaceAboveInViewPort = anchorElRect.top;
    const spaceBelowInViewPort = d.body.clientHeight - anchorElRect.bottom;
    const spaceAbove = Math.min(spaceAboveInContainer, spaceAboveInViewPort);
    const spaceBelow = Math.min(spaceBelowInContainer, spaceBelowInViewPort);
    const anchorElTopInContainer = containerElScroll.y + spaceAboveInContainer;
    const anchorElBottomInContainer = containerEl.scrollHeight - anchorElTopInContainer - anchorElRect.height;
    const anchorElLeftInContainer = containerElScroll.x + (anchorElRect.left - containerElBorderLeft - containerElRect.left);
    const expandsDown =
      spaceBelow > SPACE_BELOW_NEEDED_TO_AUTOMATICALLY_EXPAND_DOWN
        ||
      (
        Math.max(spaceBelow, spaceAbove) >= MINIMUM_HEIGHT
          ? spaceBelow >= spaceAbove
          : spaceBelowInViewPort >= spaceAboveInViewPort
      );
    const top = mobileMode ? 0 : (expandsDown ? (anchorElTopInContainer + anchorElRect.height) : null);
    const bottom = mobileMode ? 0 : (expandsDown ? null : (spaceBelowInContainer - containerElScroll.y + anchorElRect.height));
    const left = mobileMode
      ? 0
      :
        Math.min(
          Math.max(
            anchorElLeftInContainer + anchorElRect.width/2 - width/2,
            containerElScroll.x + Math.max(containerElRect.left * -1 - containerElBorderLeft, 0) + margin
          ),
          containerElInnerWidth + containerEl.scrollLeft - Math.max(containerElRect.right - containerElBorderAndScrollRight - d.body.clientWidth, 0) - margin - width
        );
    const maxHeight = mobileMode ? '100vh' : Math.max((expandsDown ? spaceBelow : spaceAbove) - margin, MINIMUM_HEIGHT);
    const height = mobileMode ? '100vh' : Math.min(INITIAL_HEIGHT, maxHeight);  // initial height
    const position = mobileMode ? 'fixed' : 'absolute';
    const zIndex = (options.zIndex != null ? options.zIndex : DEFAULT_Z_INDEX) + '';  // if it is not a string, "px" will get appended
    const border = mobileMode ? '' : '1px solid #333';
    const borderRadius = mobileMode ? 0 : 3;
    const boxShadow = mobileMode ? '' : '0 2px 8px rgba(0,0,0,.2)';
    const visibility = 'visible';

    return {
      top,
      bottom,
      left,
      width,
      maxHeight,
      height,
      position,
      zIndex,
      border,
      borderRadius,
      boxShadow,
      visibility,
    };
  };

  const getInstanceTemplate = isUtility => {

    // create widget container
    const widgetEl = newEl('div');

    hideWidgetEl(widgetEl);
    
    // create widget arrow element
    const arrowEl = newEl('div', {
      style: `
        position: absolute;
        width: 16px;
        height: 16px;
        border: 1px solid #333;
      `,
    });

    // create iframe with widget
    const iframeEl = newEl('iframe', {
      src: `${widgetUrl}${widgetUrlHash}${(isUtility ? "&utility=1" : "")}`,
      style: `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: white;
        border: none;
      `,
    });

    iframeEl.addEventListener('load', () => iframeEl.loaded = true);

    widgetEl.appendChild(arrowEl);
    widgetEl.appendChild(iframeEl);

    return {
      widgetEl,
      arrowEl,
      iframeEl,
    };
    
  };

  const makeRelativeIfStatic = el => {
    const elComputedStyle = el && getComputedStyle(el);

    if(el && elComputedStyle.position === 'static') {
      el.style.setProperty('position', 'relative', 'important');
    }
  };

  const getUtilityInstance = () => {
    if(!utilityInstance || !d.body.contains(utilityInstance.iframeEl)) {
      utilityInstance = getInstanceTemplate(true);
      utilityInstance.actionIndexResponseMap = {};

      const { widgetEl, arrowEl, iframeEl, actionIndexResponseMap } = utilityInstance;

      // will not be used as visual component, thus arrow unneeded
      arrowEl.remove();

      // set up postMessage communcation
      const iframeElEvent = event => {
        const { data, source, origin } = event;

        if(source != iframeEl.contentWindow) return;
        if(origin != widgetDomain && widgetDomain != '*') return;

        const handleResponse = actionIndexResponseMap[data.payload.actionIndex];
        handleResponse && handleResponse({ data });
        delete actionIndexResponseMap[data.payload.actionIndex];
      };

      w.addEventListener('message', iframeElEvent);

      d.body.appendChild(widgetEl);
    }

    return utilityInstance;
  };

  const loadOnDeckInstances = () => {
    const onDeckInstanceContainers = onDeckInstances.map(onDeckInstance => onDeckInstance.widgetEl.parentNode);

    // no more than 10 containers
    [
      ...(settings.containerEls instanceof Array ? settings.containerEls : []),
      d.body,
    ].slice(0,10).forEach(containerEl => {

      if(onDeckInstanceContainers.includes(containerEl)) return
  
      const onDeckInstance = getInstanceTemplate()
  
      onDeckInstances.push(onDeckInstance)
      makeRelativeIfStatic(containerEl)
      containerEl.appendChild(onDeckInstance.widgetEl)

      onDeckInstanceContainers.push(containerEl)
    })

    // load the utility instance as well, if it does not yet exist
    getUtilityInstance();
  };

  const destroyInstance = id => {
    if(!instances[id]) return;
    const { widgetEl, iframeElEvent } = instances[id];
    widgetEl.remove();
    w.removeEventListener('message', iframeElEvent) ;         
    delete instances[id];
  };

  const postMessage = ({ iframeWindow, action, payload }) => {

    // get rid of any non-transferable aspects to the payload
    payload = JSON.parse(JSON.stringify(payload))

    iframeWindow.postMessage({
      action,
      payload,
    }, widgetDomain)
  }

  const performActionOnUtilityInstance = ({ action, payload={}, handleResponse }) => {
    let { widgetEl, iframeEl, actionIndexResponseMap } = getUtilityInstance();
    const actionIndex = utilityActionIndex++;

    // postMessage the options upon iframe load 
    const sendActionMessage = () => {
      postMessage({
        iframeWindow: iframeEl.contentWindow,
        action,
        payload: {
          ...payload,
          actionIndex,
        },
      })
    }

    if(handleResponse) {
      actionIndexResponseMap[actionIndex] = handleResponse;
    }

    if(iframeEl.loaded) {
      sendActionMessage();
    } else {
      iframeEl.addEventListener('load', sendActionMessage);
    }
  };

  const styleEl = d.createElement('style');
  styleEl.innerHTML = '';  // add styles in here
  d.head.appendChild(styleEl);

  w.addEventListener('load', loadOnDeckInstances);

  performActionOnUtilityInstance({ action: '-' });  // gets the embeddingAppId retrieved and set

  w.bibleTagsWidget = {

    setUp: (options={}) => {
      settings = options || {};

      performActionOnUtilityInstance({
        action: 'setUp',
        payload: {
          settings,
        },
      });

      loadOnDeckInstances();
    },

    preload: (options={}) => {

      performActionOnUtilityInstance({
        action: 'preload',
        payload: {
          settings,
          options,
        },
      });

    },

    show: (options={}) => {

      const id = idIndex++;
      const style = getWidgetElStyle({ options });
      const containerEl = getContainerEl(options);

      const { widgetEl, iframeEl, arrowEl } = (() => {
        for(let idx=0; idx<onDeckInstances.length; idx++) {
          if(onDeckInstances[idx].widgetEl.parentNode === containerEl) {
            return onDeckInstances.splice(idx, 1)[0];
          }
        }
        if(onDeckInstances.length > 0) {
          return onDeckInstances.splice(0, 1)[0];
        }
        return getInstanceTemplate();
      })();

      if(!(settings.containerEls instanceof Array)) {
        settings.containerEls = [ containerEl ]
      } else {
        // make sure it is the first in the list of containerEls
        settings.containerEls = settings.containerEls.filter(el => el !== containerEl);
        settings.containerEls.unshift(containerEl);
      }

      iframeEl.style.width = `${style.width}px`;
      options.maxHeight = style.maxHeight;
      
      // postMessage the options upon iframe load 
      const sendShowPostMessage = () => {

        // I could not see any reason why I had the following line. (But I am
        // leaving it commented out in case removing it breaks something.) Note
        // that at the same time I had this line, I used onload instead of the 
        // load event.
        // iframeEl.loaded = false;

        postMessage({
          iframeWindow: iframeEl.contentWindow,
          action: 'show',
          payload: {
            settings,
            options,
          },
        })
      }

      // set up postMessage communcation
      const iframeElEvent = event => {
        const { data, source, origin } = event;

        if(source != iframeEl.contentWindow) return;
        if(origin != widgetDomain && widgetDomain != '*') return;

        switch(data.action) {
          case 'close':
            destroyInstance(id);
            break;

          case 'ready':
            setWidgetElStyle({ widgetEl, style, iframeEl });
            setTimeout(() => widgetEl.style.transition = `height .1s ease-in-out`, 100);
            break;

          case 'updateHeight':
            const newHeight = parseInt(data.payload.height)
            if(newHeight) {
              widgetEl.style.height = `${newHeight}px`;
              style.height = newHeight
            }
            break;
        }
      };

      if(widgetEl.parentElement != containerEl) {
        makeRelativeIfStatic(containerEl);
        iframeEl.loaded = false;
        containerEl.appendChild(widgetEl);
      }

      if(!options.anchorEl || getMobileMode()) {
        arrowEl.remove();
      }
      
      w.addEventListener('message', iframeElEvent)

      if(iframeEl.loaded) {
        sendShowPostMessage();
      } else {
        iframeEl.addEventListener('load', sendShowPostMessage);
      }

      instances[id] = {
        widgetEl,
        iframeElEvent,
      };
      
      // the timeout prevents this code from slowing down the initial resize of instance we are now showing
      setTimeout(loadOnDeckInstances, 500);

      return id;
      
    },

    hide: ({ widgetInstanceId }={}) => {
      // destroy the matching widget iframe (or all, if id is absent)
      if(widgetInstanceId) {
        destroyInstance(widgetInstanceId);
      } else {
        Object.keys(instances).forEach(id => destroyInstance(id));
      }
    },

    getCorrespondingVerseLocations: ({ callback, ...options }={}) => {

      return new Promise(resolve => {
        performActionOnUtilityInstance({
          action: 'getCorrespondingVerseLocations',
          payload: {
            options,
          },
          handleResponse: ({ data }) => {
            switch(data.action) {
              case 'reportCorrespondingVerseLocations':
                callback && callback(data.payload.verseLocations)
                resolve(data.payload.verseLocations)
                break
            }
          },
        })
      })

    },

    splitVerseIntoWords: ({ callback, ...options }={}) => {

      return new Promise(resolve => {
        performActionOnUtilityInstance({
          action: 'splitVerseIntoWords',
          payload: {
            options,
          },
          handleResponse: ({ data }) => {
            switch(data.action) {
              case 'reportWordsArray':
                callback && callback(data.payload.words)
                resolve(data.payload.words)
                break
            }
          },
        })
      })

    },

  };

})(document, window);