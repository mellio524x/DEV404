import React, { useState } from 'react';
import { Music, Video, User, Mail, Play, ArrowLeft, Pause } from 'lucide-react';

const MainInterface = () => {
  const [activeTab, setActiveTab] = useState('bio');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playingAlbum, setPlayingAlbum] = useState(null);

  const videos = [
    {
      id: '6uOrPmM0gBg',
      title: 'Pull the Plug',
      thumbnail: `https://img.youtube.com/vi/6uOrPmM0gBg/maxresdefault.jpg`
    },
    {
      id: '9R3sYBrbsRY', 
      title: "Don't Blink",
      thumbnail: `https://img.youtube.com/vi/9R3sYBrbsRY/maxresdefault.jpg`
    },
    {
      id: 'c7kxOS2wh9Q',
      title: 'Party Through Time', 
      thumbnail: `https://img.youtube.com/vi/c7kxOS2wh9Q/maxresdefault.jpg`
    },
    {
      id: 'nGgCw4msDG8',
      title: ':28:06:42:12',
      thumbnail: `https://img.youtube.com/vi/nGgCw4msDG8/maxresdefault.jpg`
    },
    {
      id: 'VqVkf0COL1w',
      title: 'Race Against Time',
      thumbnail: `https://img.youtube.com/vi/VqVkf0COL1w/maxresdefault.jpg`
    },
    {
      id: '00-_LcpNSWM',
      title: 'Hello, World',
      thumbnail: `https://img.youtube.com/vi/00-_LcpNSWM/maxresdefault.jpg`
    }
  ];

  const albums = [
    {
      id: 's34OeBscKP0',
      title: 'Fractured Horizons',
      subtitle: 'New Album',
      thumbnail: `https://img.youtube.com/vi/s34OeBscKP0/maxresdefault.jpg`
    },
    {
      id: 'broken',
      title: 'BROKEN',
      subtitle: 'Latest Album',
      thumbnail: 'https://customer-assets.emergentagent.com/job_devmusic-refresh/artifacts/vyaf07ou_Broken%20cover.png'
    },
    {
      id: 'hello-world',
      title: 'Hello, World!',
      subtitle: 'Debut Album', 
      thumbnail: 'https://customer-assets.emergentagent.com/job_devmusic-refresh/artifacts/qgcwoa8a_HWlogo.png'
    }
  ];

  const TabButton = ({ icon: Icon, label, tabKey, active }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        active
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  const VideoCard = ({ video, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-gray-900/50 rounded-lg overflow-hidden cursor-pointer group hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium">{video.title}</h3>
      </div>
    </div>
  );

  const AlbumCard = ({ album }) => {
    const isPlaying = playingAlbum === album.id;

    const togglePlay = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setPlayingAlbum(isPlaying ? null : album.id);
    };

    return (
      <div className="bg-gray-900/50 rounded-lg overflow-hidden group hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 relative">
        <div className="relative">
          <img
            src={album.thumbnail}
            alt={album.title}
            className="w-full h-48 object-cover"
          />
          
          {/* Music Visualizer Overlay */}
          {isPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="music-visualizer flex items-center space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="visualizer-bar bg-cyan-400"
                    style={{
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
          
          {/* Play/Pause Button */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className={`w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : ''
              }`}
            >
              {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12" />}
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-medium">{album.title}</h3>
          <p className="text-cyan-400 text-sm">{album.subtitle}</p>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'music':
        return (
          <div className="text-center max-w-4xl mx-auto">
            {/* Latest Album Section */}
            <div className="mb-12">
              <div className="bg-gray-900/30 rounded-lg p-8 border border-cyan-500/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Album Cover */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-48 h-48 rounded-lg overflow-hidden group">
                      <img
                        src="https://customer-assets.emergentagent.com/job_devmusic-refresh/artifacts/vyaf07ou_Broken%20cover.png"
                        alt="BROKEN"
                        className="w-full h-full object-cover"
                      />
                      {/* Music Visualizer Overlay */}
                      {playingAlbum === 'broken' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="music-visualizer flex items-center space-x-1">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="visualizer-bar bg-cyan-400"
                                style={{ animationDelay: `${i * 0.1}s` }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Play Button */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => setPlayingAlbum(playingAlbum === 'broken' ? null : 'broken')}
                          className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        >
                          {playingAlbum === 'broken' ? <Pause className="w-16 h-16" /> : <Play className="w-16 h-16" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Album Info */}
                  <div className="flex-1 text-left">
                    <div className="text-cyan-400 text-sm mb-2 font-mono">Latest Album</div>
                    <h3 className="text-4xl font-bold text-white mb-4">BROKEN</h3>
                    <p className="text-gray-300 mb-4">
                      The latest sonic exploration from DEV 404, featuring tracks that push the boundaries 
                      between code and sound. Experience the intersection of digital architecture and musical expression.
                    </p>
                    <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-lg transition-colors">
                      Stream Album
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Albums Grid */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">More Albums</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fractured Horizons */}
                <div className="bg-gray-900/30 rounded-lg p-6 border border-cyan-500/20">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 relative">
                      <div className="w-32 h-32 rounded-lg overflow-hidden group">
                        <img
                          src="https://img.youtube.com/vi/s34OeBscKP0/maxresdefault.jpg"
                          alt="Fractured Horizons"
                          className="w-full h-full object-cover"
                        />
                        {playingAlbum === 'fractured' && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="music-visualizer flex items-center space-x-1 scale-75">
                              {[...Array(6)].map((_, i) => (
                                <div
                                  key={i}
                                  className="visualizer-bar bg-cyan-400"
                                  style={{ animationDelay: `${i * 0.1}s` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <button
                            onClick={() => setPlayingAlbum(playingAlbum === 'fractured' ? null : 'fractured')}
                            className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-all duration-300"
                          >
                            {playingAlbum === 'fractured' ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-cyan-400 text-sm mb-1 font-mono">New Album</div>
                      <h3 className="text-xl font-bold text-white mb-2">Fractured Horizons</h3>
                      <p className="text-gray-400 text-sm">
                        An exploration of broken timelines and digital landscapes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hello, World! */}
                <div className="bg-gray-900/30 rounded-lg p-6 border border-cyan-500/20">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 relative">
                      <div className="w-32 h-32 rounded-lg overflow-hidden group">
                        <img
                          src="https://customer-assets.emergentagent.com/job_devmusic-refresh/artifacts/qgcwoa8a_HWlogo.png"
                          alt="Hello, World!"
                          className="w-full h-full object-cover"
                        />
                        {playingAlbum === 'hello-world' && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="music-visualizer flex items-center space-x-1 scale-75">
                              {[...Array(6)].map((_, i) => (
                                <div
                                  key={i}
                                  className="visualizer-bar bg-cyan-400"
                                  style={{ animationDelay: `${i * 0.1}s` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <button
                            onClick={() => setPlayingAlbum(playingAlbum === 'hello-world' ? null : 'hello-world')}
                            className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-all duration-300"
                          >
                            {playingAlbum === 'hello-world' ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-cyan-400 text-sm mb-1 font-mono">Debut Album</div>
                      <h3 className="text-xl font-bold text-white mb-2">Hello, World!</h3>
                      <p className="text-gray-400 text-sm">
                        The beginning of a sonic journey. First steps into digital music.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Music Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <VideoCard 
                  key={index} 
                  video={video} 
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          </div>
        );

      case 'bio':
        return (
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">About DEV 404</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-2xl">
                  <img
                    src="https://customer-assets.emergentagent.com/job_devmusic-refresh/artifacts/eghxz7is_Profile.png"
                    alt="DEV 404 Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Bio Content */}
              <div className="flex-1">
                <div className="bg-gray-900/30 rounded-lg p-6 border border-cyan-500/20">
                  <div className="text-cyan-400 text-sm mb-2 font-mono">Full-Stack Developer • Sonic Architect</div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    DEV 404 is a full-stack web developer turned sonic architect. With a background in code and a heart 
                    wired for creation, he blends tech and music into one seamless experience. More than just an artist — 
                    he's a Full-Stack Wizard of sound and syntax, building from the static.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Join the Fanbase</h2>
            <div className="text-cyan-400 mb-6 font-mono">DEV@devmusic404.com</div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name (optional)"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
              <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Join the Fanbase
              </button>
              <div className="pt-4">
                <p className="text-cyan-400 mb-2 font-medium">Follow DEV 404</p>
                <p className="text-gray-400 text-sm">Connect on social media</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Video Modal
  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-black/90 backdrop-blur-sm">
        <div className="bokeh-bg">
          <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl">
              <button
                onClick={() => setSelectedVideo(null)}
                className="flex items-center space-x-2 text-white mb-4 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Videos</span>
              </button>
              
              <div className="bg-gray-900/80 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">{selectedVideo.title}</h2>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="bokeh-bg">
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          <div className="text-center mb-8">
            {/* DEV404 Logo */}
            <div className="w-40 h-40 mx-auto mb-6 relative">
              <img
                src="https://customer-assets.emergentagent.com/job_devmusic-refresh/artifacts/p62y1l5k_logo.png"
                alt="DEV404 Logo"
                className="w-full h-full object-contain"
              />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                LIVE
              </div>
            </div>

            {/* Title */}
            <h1 className="text-6xl font-bold text-cyan-400 mb-4 tracking-wider">
              DEV 404
            </h1>
            <p className="text-white text-xl mb-8">
              Full-Stack Web Developer Turned Sonic Architect
            </p>

            {/* Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <TabButton 
                icon={Music} 
                label="Music" 
                tabKey="music"
                active={activeTab === 'music'}
              />
              <TabButton 
                icon={Video} 
                label="Videos" 
                tabKey="videos"
                active={activeTab === 'videos'}
              />
              <TabButton 
                icon={User} 
                label="Bio" 
                tabKey="bio"
                active={activeTab === 'bio'}
              />
              <TabButton 
                icon={Mail} 
                label="Contact" 
                tabKey="contact"
                active={activeTab === 'contact'}
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full max-w-6xl">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInterface;