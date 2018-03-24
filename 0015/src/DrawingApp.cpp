#include "cinder/app/App.h"
#include "cinder/app/KeyEvent.h"
#include "cinder/app/RendererGl.h"
#include "cinder/gl/gl.h"
#include "cinder/gl/Fbo.h"

#include "Resources.h"

#define SCREEN_WIDTH    1024
#define SCREEN_HEIGHT   1024
#define RENDER_SIZE     8192


using namespace ci;
using namespace ci::app;
using namespace std;

class DrawingApp : public App {
    
public:
	void setup() override;
	void mouseDown( MouseEvent event ) override;
	void update() override;
	void draw() override;
    
    void renderToFbo();
    void saveImage();
 
private:
    gl::GlslProgRef _shader;
    gl::BatchRef    _rect;
    CameraOrtho     _camera;
    gl::FboRef      _fbo;
    
    bool            _saved = false;
};


void DrawingApp::setup()
{
    _fbo = gl::Fbo::create(RENDER_SIZE, RENDER_SIZE);
    _camera.setOrtho( -0.5f, 0.5f, 0.5f, -0.5f, -1, 1 );
    _shader = gl::GlslProg::create(
        gl::GlslProg::Format()
            .vertex(loadAsset("main.vert"))
            .fragment(loadAsset("main.frag")));
    
    auto rect = geom::Rect().colors( Color( 1, 0, 0 ),
                                     Color( 0, 0, 0 ),
                                     Color( 0, 0, 1 ),
                                     Color( 1, 0, 1 ) );
    _rect = gl::Batch::create( rect, _shader );
}

void DrawingApp::mouseDown( MouseEvent event )
{
}

void DrawingApp::update()
{
}

void DrawingApp::renderToFbo() {
    gl::ScopedFramebuffer fbScope(_fbo);
    gl::clear( Color( 0, 0, 0 ) );
    gl::ScopedViewport scpVp( ivec2( 0 ), _fbo->getSize() );
    
    gl::setMatrices(_camera);
    _rect->draw();
}

void DrawingApp::draw()
{
    renderToFbo();
    gl::clear( Color( 0, 0, 0 ) );
    gl::setMatrices(_camera);
    
    _fbo->bindTexture();
    gl::setMatricesWindow( toPixels( getWindowSize() ) );
    gl::draw( _fbo->getColorTexture(), Rectf( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT ) );
    
    if(!_saved) {
        _saved = true;
        saveImage();
    }
}

void DrawingApp::saveImage() {
//    writeImage("0015.png", Surface8u(_fbo->getColorTexture()->createSource()));
}

CINDER_APP( DrawingApp, RendererGl(), [&]( App::Settings *settings ) {
    settings->setResizable(false);
    settings->setWindowSize( SCREEN_WIDTH, SCREEN_HEIGHT );
})
