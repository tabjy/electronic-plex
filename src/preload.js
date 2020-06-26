const { remote } = require('electron')

const Player = require('mpris-service')

document.addEventListener('DOMContentLoaded', function () {
  const player = Player({
    name: 'plex',
    identity: 'Plex Media Player',
    supportedUriSchemes: ['file'],
    supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
    supportedInterfaces: ['player']
  })

  let audio

  player.on('pause', () => {
    if (audio) {
      audio.pause()
    }
  })
  player.on('play', () => {
    if (audio) {
      audio.play()
    }
  })
  player.on('playpause', () => {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  })
  player.on('next', () => {
    remote.getCurrentWebContents().sendInputEvent({
      type: 'keyDown',
      keyCode: 'Right',
      modifiers: ['shift']
    })
  })
  player.on('previous', () => remote.getCurrentWebContents().sendInputEvent({
    type: 'keyDown',
    keyCode: 'Left',
    modifiers: ['shift']
  }))
  player.on('seek', (position) => {
    if (audio) {
      audio.currentTime += position / 1000 / 1000
    }
  })
  player.on('volume', (volume) => {
    if (audio) {
      audio.volume = volume
    }
  })

  setInterval(() => {
    audio = document.getElementsByTagName('audio')[0]
    if (!audio) {
      player.metadata = {}
      player.playbackStatus = Player.PLAYBACK_STATUS_STOPPED
      player.getPosition = () => 0
      return
    }

    player.metadata = {
      'mpris:length': ~~audio.duration * 1000 * 1000,
      'xesam:title': document.title.slice(audio.paused ? 0 : 2)
    }
    player.playbackStatus = audio.paused ? Player.PLAYBACK_STATUS_PAUSED : Player.PLAYBACK_STATUS_PLAYING
    player.getPosition = () => audio ? audio.currentTime * 1000 * 1000 : 0
    player.volume = audio.volume
  }, 500)
})
