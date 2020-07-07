package io.agileintelligence.ppmtool.security;

import com.google.gson.Gson;
import io.agileintelligence.ppmtool.loginpayload.InvalidLoginResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JWTAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

    /***
     * Also {@link AuthenticationEntryPoint}
     * for a 401 Unauthorized response back to the client. <br/>
     * By default, the {@link org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint} provisioned by Spring Security returns a full HTML page
     * <br/>
     * But we only need JSON so we will directly write in {@param response}
     * @param request that resulted in an <code>AuthenticationException</code>
     * @param response so that the user agent can begin authentication
     * @param authException that caused the invocation
     * @throws IOException
     */
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        final String jsonLoginResponse = getInvalidLoginJSONResponse();

        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
        response.addHeader("WWW-Authenticate", "Basic realm=\"" + getRealmName() + "\"");

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().println(jsonLoginResponse);
    }

    protected String getInvalidLoginJSONResponse() {
        final var invalidLoginResponse = new InvalidLoginResponse();
        return new Gson().toJson(invalidLoginResponse);
    }

    @Override
    public void afterPropertiesSet() {
        setRealmName("localhost");
        super.afterPropertiesSet();
    }
}