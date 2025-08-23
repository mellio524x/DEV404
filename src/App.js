import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Music, Video, User, Mail, Facebook, Youtube, Twitter } from 'lucide-react';
import TerminalBoot from './components/TerminalBoot';
import AudioVisualizer from './components/AudioVisualizer';
import CodeVisualizer from './components/CodeVisualizer';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

export default function App() {
  const [showBoot, setShowBoot] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [signupCount, setSignupCount] = useState(0);

  useEffect(() => {
    // Well Hello there.......
    const hasSeenBoot = sessionStorage.getItem('dev404-boot-seen');
    if (hasSeenBoot) {
      setShowBoot(false);
    }
  }, []);

  useEffect(() => {
    if (!showBoot) {
      const fetchSignupCount = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/signups/count`);
          setSignupCount(response.data.count);
        } catch (error) {
          console.error('Error fetching signup count:', error);
        }
      };
      fetchSignupCount();
    }
  }, [showBoot]);

  useEffect(() => {
    const simulateAudioReactivity = () => {
      setIsPlaying(Math.random() > 0.7);
    };

    const interval = setInterval(simulateAudioReactivity, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('dev404-boot-seen', 'true');
    setShowBoot(false);
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await axios.post(`${BACKEND_URL}/api/signup`, {
        email: email,
        name: name || 'Fan'
      });

      setSubmitMessage(response.data.message);
      setEmail('');
      setName('');
      setSignupCount(prev => prev + 1);
    } catch (error) {
      if (error.response?.status === 400) {
        setSubmitMessage('This email is already registered in our fanbase!');
      } else if (error.response?.status === 422) {
        setSubmitMessage('Please enter a valid email address.');
      } else {
        setSubmitMessage(error.response?.data?.detail || 'An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showBoot) {
    return <TerminalBoot onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white app-fade-in">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1483000805330-4eaf0a0d82da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzU0MzcwMzY1fDA&ixlib=rb-4.1.0&q=85')`
          }}
        />

        {/* Logo and Title */}
        <div className="relative z-10 text-center px-6">
          <div className="mb-8">
            {/* DEV404 Logo */}
            <div className="w-48 h-48 mx-auto mb-6 shadow-2xl logo-pulse rounded-full overflow-hidden bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border-4 border-cyan-400/50">
              <img
                src="https://customer-assets.emergentagent.com/job_devmusic-refresh/artifacts/p62y1l5k_logo.png"
                alt="DEV404 Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent typewriter">
              DEV 404
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto typewriter-delay">
              Full-Stack Web Developer Turned Sonic Architect
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/50 backdrop-blur-md rounded-full p-2">
              <Tabs defaultValue="music" className="w-auto">
                <TabsList className="grid w-full grid-cols-4 bg-transparent">
                  <TabsTrigger value="music" className="data-[state=active]:bg-blue-600">
                    <Music className="w-4 h-4 mr-2" />
                    Music
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="data-[state=active]:bg-blue-600">
                    <Video className="w-4 h-4 mr-2" />
                    Videos
                  </TabsTrigger>
                  <TabsTrigger value="bio" className="data-[state=active]:bg-blue-600">
                    <User className="w-4 h-4 mr-2" />
                    Bio
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="data-[state=active]:bg-blue-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </TabsTrigger>
                </TabsList>

                {/* Music Section */}
                <TabsContent value="music" className="mt-8">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center">Albums</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Fractured Horizons Album - NEW */}
                      <div className="relative album-code-effect">
                        <AudioVisualizer isPlaying={isPlaying} />
                        <CodeVisualizer isPlaying={isPlaying} />
                        <Card className="bg-black/30 backdrop-blur-md border-gray-800 relative z-20">
                          <CardHeader>
                            <CardTitle className="text-cyan-400">Fractured Horizons</CardTitle>
                            <CardDescription className="text-gray-400">New Album</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <iframe
                              src="https://www.youtube.com/embed/s34OeBscKP0?si=VRhVyWB7xneZC_rf"
                              width="100%"
                              height="315"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                              title="Fractured Horizons Album"
                              onLoad={() => setIsPlaying(true)}
                            />
                          </CardContent>
                        </Card>
                      </div>

                      {/* BROKEN Album */}
                      <div className="relative album-code-effect">
                        <AudioVisualizer isPlaying={isPlaying} />
                        <CodeVisualizer isPlaying={isPlaying} />
                        <Card className="bg-black/30 backdrop-blur-md border-gray-800 relative z-20">
                          <CardHeader>
                            <CardTitle className="text-cyan-400">BROKEN</CardTitle>
                            <CardDescription className="text-gray-400">Latest Album</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <iframe
                              src="https://www.youtube.com/embed/videoseries?si=sNUcSJ7p3U35BQCV&list=OLAK5uy_mgbjUkaeNGAw52C-6PSWgUJ_cYoJp4skI"
                              width="100%"
                              height="315"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                              title="BROKEN Album"
                              onLoad={() => setIsPlaying(true)}
                            />
                          </CardContent>
                        </Card>
                      </div>

                      {/* Hello, World! Album */}
                      <div className="relative album-code-effect">
                        <AudioVisualizer isPlaying={isPlaying} />
                        <CodeVisualizer isPlaying={isPlaying} />
                        <Card className="bg-black/30 backdrop-blur-md border-gray-800 relative z-20">
                          <CardHeader>
                            <CardTitle className="text-cyan-400">Hello, World!</CardTitle>
                            <CardDescription className="text-gray-400">Debut Album</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <iframe
                              src="https://www.youtube.com/embed/videoseries?si=Y_KMn3roPYpPBG78&list=OLAK5uy_l5VwiQtYvUpLvL9eC1qym-mN5oAC_hgo0"
                              width="100%"
                              height="315"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                              title="Hello, World! Album"
                              onLoad={() => setIsPlaying(true)}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Videos Section */}
                <TabsContent value="videos" className="mt-8">
                  <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center">Music Videos</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Pull the Plug */}
                      <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-cyan-400">Pull the Plug</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <iframe
                            src="https://www.youtube.com/embed/6uOrPmM0gBg?si=nlh3RGqIV8_Fwvts"
                            width="100%"
                            height="200"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                            title="Pull the Plug"
                          />
                        </CardContent>
                      </Card>

                      {/* Don't Blink */}
                      <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-cyan-400">Don't Blink</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <iframe
                            src="https://www.youtube.com/embed/9R3sYBrbsRY?si=-ZCH3m6cJg4zOC0U"
                            width="100%"
                            height="200"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                            title="Don't Blink"
                          />
                        </CardContent>
                      </Card>

                      {/* Party Through Time */}
                      <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-cyan-400">Party Through Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <iframe
                            src="https://www.youtube.com/embed/c7kxOS2wh9Q?si=4Q657k1G8Ne1DZVy"
                            width="100%"
                            height="200"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                            title="Party Through Time"
                          />
                        </CardContent>
                      </Card>

                      {/* :28:06:42:12 */}
                      <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-cyan-400">:28:06:42:12</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <iframe
                            src="https://www.youtube.com/embed/nGgCw4msDG8?si=GH4vkEwE0myJo8wj"
                            width="100%"
                            height="200"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                            title=":28:06:42:12"
                          />
                        </CardContent>
                      </Card>

                      {/* Race Against Time */}
                      <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-cyan-400">Race Against Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <iframe
                            src="https://www.youtube.com/embed/VqVkf0COL1w?si=WM3eD-g3gm6AJJkO"
                            width="100%"
                            height="200"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                            title="Race Against Time"
                          />
                        </CardContent>
                      </Card>

                      {/* Hello, World */}
                      <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-cyan-400">Hello, World</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <iframe
                            src="https://www.youtube.com/embed/00-_LcpNSWM?si=ixxDaWlrxyYcd1hd"
                            width="100%"
                            height="200"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                            title="Hello, World"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Bio Section */}
                <TabsContent value="bio" className="mt-8">
                  <div className="max-w-4xl mx-auto">
                    <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                      <CardHeader className="text-center">
                        <div
                          className="w-32 h-32 mx-auto mb-6 rounded-full bg-cover bg-center border-4 border-cyan-400/50 shadow-2xl"
                          style={{
                            backgroundImage: `url('https://customer-assets.emergentagent.com/job_devmusic-refresh/artifacts/eghxz7is_Profile.png')`
                          }}
                        />
                        <CardTitle className="text-3xl text-cyan-400 mb-2">About DEV 404</CardTitle>
                        <Badge variant="outline" className="border-blue-500 text-blue-400">
                          Full-Stack Developer • Sonic Architect
                        </Badge>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-lg text-gray-300 leading-relaxed">
                          DEV 404 is a full-stack web developer turned sonic architect. With a background in code
                          and a heart wired for creation, he blends tech and music into one seamless experience.
                          More than just an artist — he's a Full-Stack Wizard of sound and syntax, building from the static.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Contact Section */}
                <TabsContent value="contact" className="mt-8">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center">Join the Fanbase</h2>
 <div className="text-center mb-6">
      <a
        href="mailto:DEV@devmusic404.com"
        className="text-cyan-400 hover:underline"
      >
        DEV@devmusic404.com
      </a>
    </div>
                    
                    {/* Email Signup */}
                    <form
  action="https://formspree.io/f/xkgzpnvw"
  method="POST"
  className="space-y-4"
>
  <Input
    type="text"
    name="name"
    placeholder="Your name (optional)"
    className="bg-black/50 border-gray-700 text-white"
  />
  <Input
    type="email"
    name="email"
    placeholder="Your email address"
    required
    className="bg-black/50 border-gray-700 text-white"
  />
  <Button
    type="submit"
    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
  >
    Join the Fanbase
      
  </Button>
</form>
                    {/* Social Media Links */}
                    <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                      <CardHeader className="text-center">
                        <CardTitle className="text-cyan-400">Follow DEV 404</CardTitle>
                        <CardDescription className="text-gray-400">
                          Connect on social media
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center gap-4 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://www.youtube.com/@DEV_Music_404', '_blank')}
                          >
                            <Youtube className="w-4 h-4 mr-2" />
                            YouTube
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://open.spotify.com/artist/7lvmTahHl3ViENKZrWjsG4?si=uoxP-bxMQ_yQm_OsxkBBaQ', '_blank')}
                          >
                            <Music className="w-4 h-4 mr-2" />
                            Spotify
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://www.facebook.com/profile.php?id=61578195951086', '_blank')}
                          >
                            <Facebook className="w-4 h-4 mr-2" />
                            Facebook
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://twitter.com/dev_40435715', '_blank')}
                          >
                            <Twitter className="w-4 h-4 mr-2" />
                            X
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://www.tiktok.com/@X_dev404_X', '_blank')}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            TikTok
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}