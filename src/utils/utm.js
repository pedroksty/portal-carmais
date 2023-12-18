import Cookies from 'js-cookie'

function getParameterByName(name) {
  if(typeof window === 'undefined') return

  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getParamameters() {
  let source,
    medium,
    campaign,
    content;

  source = getParameterByName('source')
    ? 'adwords'
    : getParameterByName('utm_source');

  medium = getParameterByName('medium')
    ? 'medium-' + getParameterByName('medium')
    : getParameterByName('utm_medium');

  medium = getParameterByName('source')
    ? medium + ',source-' + getParameterByName('source')
    : medium;

  campaign = getParameterByName('campaign')
    ? 'campaign-' + getParameterByName('campaign')
    : getParameterByName('utm_campaign');

  campaign = getParameterByName('adgroup')
    ? campaign + ',adgroup-' + getParameterByName('adgroup')
    : campaign;

  content = getParameterByName('kw')
    ? getParameterByName('kw')
    : getParameterByName('utm_content');

  return {
    source,
    medium,
    campaign,
    content
  }
}

function hasParameters() {
  const { source, medium, campaign, content } = getParamameters()
  if (source || medium || campaign || content) {
    return true
  }

  return false
}

function getUTMString() {
  const { source, medium, campaign, content } = getParamameters()
  return 'utmcsr=' + source + '|utmccn=' + campaign + '|utmcmd=' + medium + '|utmcct=' + content + '|';
}

export function createCookieUTM() {
  if (hasParameters()) {
    Cookies.set('utmz', getUTMString(), {
      expires: 30, // dias
    })
  }
}

export default function getUTM() {
  if (!hasParameters()) {
    const cookieUTM = Cookies.get('utmz')
    if (cookieUTM) return cookieUTM
  }
  return getUTMString()
}
