import sbt._
import sbt.Keys._
import play.Project._
import com.tuplejump.sbt.yeoman.Yeoman

object ApplicationBuild extends Build {

  val appName = "play-angular-seed"
  val appVersion = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    // Add your project dependencies here,
    javaCore,
    javaJdbc,
    javaEbean,
    cache,
    "commons-lang" % "commons-lang" % "2.3",
    "commons-codec" % "commons-codec" % "1.2",
    "commons-io" % "commons-io" % "2.0.1",
    "org.julienrf" % "play-jsmessages_2.10" % "1.6.1"
  )

  val main = play.Project(appName, appVersion, appDependencies).settings(
    (Yeoman.yeomanSettings ++ Yeoman.withTemplates) : _*
  ).settings(	
    // Add your own project settings here
    resolvers += Resolver.url("Violas Play Modules", url("http://www.joergviola.de/releases/"))(Resolver.ivyStylePatterns),
    resolvers += Resolver.defaultLocal,
    resolvers += Resolver.url("Objectify Play Repository", url("http://schaloner.github.com/releases/"))(Resolver.ivyStylePatterns),
    resolvers += Resolver.url("Objectify Play Repository - snapshots", url("http://schaloner.github.com/snapshots/"))(Resolver.ivyStylePatterns),
    resolvers += "Repo1 Maven" at "http://repo1.maven.org/maven2/",
    resolvers += Resolver.url("play-plugin-releases", new URL("http://repo.scala-sbt.org/scalasbt/sbt-plugin-releases/"))(Resolver.ivyStylePatterns),
    resolvers += Resolver.url("play-plugin-snapshots", new URL("http://repo.scala-sbt.org/scalasbt/sbt-plugin-snapshots/"))(Resolver.ivyStylePatterns),
    resolvers += "Sonatype OSS Snapshots" at "https://oss.sonatype.org/content/repositories/snapshots"
  )
}
