package org.jvalue.ods.coreservice.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

import java.util.Map;
import java.util.Objects;

@Embeddable
public class AdapterProtocolConfig {

  @NotNull
  private String type;

  @NotNull
  private Map<String, String> parameters;

  // Constructor for JPA
  private AdapterProtocolConfig() {
  }

  @JsonCreator
  public AdapterProtocolConfig(@JsonProperty("type") String type,
      @JsonProperty("parameters") Map<String, String> parameters) {
    this.type = type;
    this.parameters = parameters;
  }

  public String getType() {
    return type;
  }

  public Map<String, String> getParameters() {
    return parameters;
  }

  @Override
  public String toString() {
    return "AdapterProtocolConfig {" + "type='" + type + '\'' + ", parameters='" + parameters + '\'' + '}';
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    AdapterProtocolConfig config = (AdapterProtocolConfig) o;
    return type.equals(config.type) && parameters.equals(config.parameters);
  }

  @Override
  public int hashCode() {
    return Objects.hash(type, parameters);
  }
}
